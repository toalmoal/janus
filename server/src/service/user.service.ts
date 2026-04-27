import config                   from 'config';
import { Not }                  from 'typeorm';
import { sign }                 from 'jsonwebtoken';
import * as bcrypt              from 'bcryptjs';

import { User }                 from 'entity/user.entity';
import { Context }              from 'model/context.model';
import { DataSource }           from '@/datasource';
import { Unauthorised }         from 'utils/errors';
import { LoggerFactory }        from '@/logger';
import { LoginHistoryService }  from 'service/login-history.service';

export class UserService {

  static logger = LoggerFactory('user.service')

  static findAll = async (includeDisabled: boolean) => {
    if (includeDisabled) {
      return await DataSource.getRepository(User).find();
    } else {
      return await DataSource.getRepository(User).findBy( { disabled: Not(true) });
    }
  }

  static findById = async (id: number) => {
    return await DataSource.getRepository(User).findOneBy({ id });
  }

  static findByEmail = async (email: string) => {
    return await DataSource.getRepository(User).findOneBy({ email });
  }

  static upsert = async (user: User) => {
    user.updatedAt = new Date();
    return await DataSource.getRepository(User).save(user);
  }

  static authenticate = async (context: Context, service: string, email: string, password: string) => {
    let user: User | null = null;
    let success = true;
    try {
      const lEmail = email.toLowerCase();
      user = await UserService.findByEmail(lEmail);
      success = (!user || user.disabled)? false: bcrypt.compareSync(password, user.password);
    } catch (error) {
      UserService.logger.error('Failed while getting user', error);
      success = false;
    }

    LoginHistoryService.recordAuth(context, service, email, success);

    if (success && user) {
      return {
        user,
        token: sign(
          { userId: user.id, email: user.email, roles: user.roles, version: config.get('jwt.version'), createdAt: new Date().toISOString() },
          config.get('crypto.secret') as string,
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
