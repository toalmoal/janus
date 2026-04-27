import _                        from 'lodash';
import { Request,
         Response }             from 'express';

import { Context }              from 'model/context.model';
import { UserView }             from 'view/user.view';
import { BadRequest }           from '@/utils/errors';
import { UserService }          from 'service/user.service';
import { LoggerFactory }        from '@/logger';
import { PasswordResetService } from 'service/password-reset.service';

export class AuthController {

  static logger = LoggerFactory('auth.controller')

  static login = async (request: Request, response: Response) => {
    const context: Context = _.get(response, 'locals.context');
    const { service, email, password } = request.body;

    const result: any = await UserService.authenticate(context, service, email, password);

    response.setHeader('Access-Token', result.token);
    response.send(UserView.toView(result.user));
  };

  static requestPasswordReset = async (request: Request, response: Response) => {
    const { email } = request.body;
    await PasswordResetService.requestPasswordReset(email);
    response.send({});
  }

  static passwordReset = async (request: Request, response: Response) => {
    const { email, code, password } = request.body;
    try {
      await PasswordResetService.resetPassword(email, code, password);
    } catch (err: any) {
      throw BadRequest(err.message);
    }
    response.send({});
  }

}
