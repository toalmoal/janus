import config               from 'config';
import * as bcrypt          from 'bcryptjs';
import { sign }             from 'jsonwebtoken';

import User                 from "entity/user.entity";
import Context              from 'model/context.model';
import DataSource           from '@/datasource';
import { Unauthorised }     from 'utils/errors';
import { LoggerFactory }    from '@/logger';
import LoginHistoryService  from 'service/login-history.service';

class UserService {

  static logger = LoggerFactory('user.service')

  static findAll = async () => {
    return await DataSource.getRepository(User).find();
  }

  static findByEmail = async (email: string) => {
    return await DataSource.getRepository(User).findOneBy({ email });
  }

  static insert = async (user: User) => {
    user.updatedAt = new Date();
    return await DataSource.getRepository(User).save(user);
  }

  static authenticate = async (context: Context, email: string, password: string) => {
    let user: User;
    let success = true;
    try {
      const lEmail = email.toLowerCase();
      user = await UserService.findByEmail(lEmail);
      success = user.disabled? false: bcrypt.compareSync(password, user.password);
    } catch (error) {
      UserService.logger.error('Failed while getting user', error);
      success = false;
    }

    LoginHistoryService.recordAuth(context, email, success);

    if (success) {
      return {
        user,
        token: sign(
          { userId: user.id, email: user.email, roles: user.roles },
          config.get('crypto.secret'),
          { expiresIn: '336h' }
        )
      };
    } else {
      if (user) {
        UserService.logger.debug(`For user [${user.email}] expected password hash [${user.password}], got [${User.passwordHash(password)}]`);
      } else {
        UserService.logger.debug(`User [${email}] not found!`);
      }
      throw Unauthorised('Invalid email/password!');
    }
  }

}
export default UserService;
