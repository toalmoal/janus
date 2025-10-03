import { Request,
         Response }         from 'express';

import _                    from 'lodash';

import Context              from 'model/context.model';
import UserView             from 'view/user.view';
import UserService          from 'service/user.service';
import ServerResponse       from 'view/server-response.view';
import { LoggerFactory }    from '@/logger';

class AuthController {

  static logger = LoggerFactory('auth.controller')

  static login = async (request: Request, response: Response) => {
    const context: Context = _.get(response, 'locals.context');
    const { email, password } = request.body;
    const result: any = await UserService.authenticate(context, email, password);

    response.setHeader('Access-Token', result.token);
    response.send(ServerResponse.success(UserView.from(result.user)));
  };

}
export default AuthController;