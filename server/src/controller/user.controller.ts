import { Request,
         Response }   from 'express';

import UserView       from 'view/user.view';
import UserService    from "service/user.service";
import ServerResponse from "view/server-response.view";

class UserController {

  static findAll = async (request: Request, response: Response) => {
    const users = await UserService.findAll();
    response.send(ServerResponse.success(UserView.from(users)));
  }

}

export default UserController;