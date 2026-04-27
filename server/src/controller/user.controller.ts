import * as _             from 'lodash';
import { Request,
         Response }       from 'express';

import { User }           from '@/entity/user.entity';
import { UserView }       from 'view/user.view';
import { UserService }    from "service/user.service";
import { LoggerFactory }  from '@/logger';

export class UserController {

  static logger = LoggerFactory('user.controller')

  static findAll = async (request: Request, response: Response) => {
    const { includeDisabled, email } = request.body;
    let users: User[];
    if (email) {
      const user = await UserService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }
      users = [ user ];
    } else {
      users = await UserService.findAll(includeDisabled);
    }
    response.send(users.map(UserView.toView));
  }

  static insert = async (request: Request, response: Response) => {
    const { email, firstName, lastName, password, roles } = request.body;
    let user = new User(email, firstName, lastName, roles.join(','), false);
    user.password = User.passwordHash(password);
    user = await UserService.upsert(user);
    response.send(UserView.toView(user));
  }

  static update = async (request: Request, response: Response) => {
    const { email, password, roles, disabled } = request.body;
    let user = await UserService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (!_.isNil(password)) {
      user.password = User.passwordHash(password);
    }
    user.roles = roles.join(',');
    user.disabled = disabled;
    user = await UserService.upsert(user);
    response.send(UserView.toView(user));
  }

}
