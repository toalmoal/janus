import { Not }                  from 'typeorm';

import { User }                 from 'entity/user.entity';
import * as utils               from '@/utils';
import { DataSource }           from '@/datasource';
import { UserService }          from './user.service';
import { LoggerFactory }        from '@/logger';
import { PasswordReset }        from 'entity/password-reset.entity';

export class PasswordResetService {

  static logger = LoggerFactory('password-reset.service')

  static findAll = async (includeDisabled: boolean) => {
    if (includeDisabled) {
      return await DataSource.getRepository(PasswordReset).find();
    } else {
      return await DataSource.getRepository(PasswordReset).findBy( { used: Not(true) });
    }
  }

  static findById = async (id: number) => {
    return await DataSource.getRepository(PasswordReset).findOneBy({ id });
  }

  static findByUserId = async (userId: number) => {
    return await DataSource.getRepository(PasswordReset).findOneBy({ userId });
  }

  static findUnusedByUserId = async (userId: number) => {
    return await DataSource.getRepository(PasswordReset).findOne({ where: { userId, used: Not(true) }});
  }

  static upsert = async (passwordReset: PasswordReset) => {
    passwordReset.updatedAt = new Date();
    return await DataSource.getRepository(PasswordReset).save(passwordReset);
  }

  static requestPasswordReset = async (email: string) => {
    try {
      let user = await UserService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      let passwordReset = new PasswordReset(user.id, utils.randomCode(6));
      passwordReset = await PasswordResetService.upsert(passwordReset);
    } catch (error) {}
  }

  static resetPassword = async (email: string, code: string, password: string) => {
    let passwordReset: PasswordReset | null;
    try {
      let user = await UserService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      passwordReset = await PasswordResetService.findUnusedByUserId(user.id);
      if (passwordReset && passwordReset.code === code) {
        user!.password = User.passwordHash(password);
        await UserService.upsert(user);
        passwordReset.used = true;
        await PasswordResetService.upsert(passwordReset);
      } else {
        throw new Error('Invalid Email or Code');
      }
    } catch (error) {
      PasswordResetService.logger.error('Failed while getting PasswordReset', error);
      throw new Error('Invalid Email or Code');
    }
  }

}
