import { Request,
         Response,
         NextFunction }     from 'express';

import _                    from 'lodash';

import User                 from 'entity/user.entity';
import Context              from 'model/context.model';
import DataSource           from '@/datasource';

const checkRole = (role: string | Array<string>, strict = false) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    let roles: Array<string>;
    if (strict) {
      const id = _.get(response, 'locals.context.userId');
      let user: User;

      if (!_.isNil(id)) {
        const userRepository = DataSource.getRepository(User);
        try {
          user = await userRepository.findOneOrFail({ where: { id }});
        } catch (error: any) {
          response.status(401).send();
          return;
        }
      }

      roles = _.get(user, 'roles', '').split(',')
    } else {
      const context: Context = _.get(response, 'locals.context');
      roles = context.roles;
    }

    const expectedRoles = Array.isArray(role)? role: [role];
    let hasRole = false;
    _.forEach(expectedRoles, (r: string) => {
        hasRole = hasRole || Context.hasRole(r, roles);
    });

    if (hasRole) {
      next();
    } else  {
      response.status(401).send();
      return;
    }
  };
};
export default checkRole;