import _                  from 'lodash';
import { Request,
         Response,
         NextFunction }   from 'express';

import { contextBuilder } from 'middleware/context.builder';

export const initContext = async (request: Request, response: Response, next: NextFunction) => {
  let token = <string> request.headers['authorization'];
  if (!_.isNil(token) && token.startsWith('Bearer ')) {
    token = token.substring(7);
  }

  const context = contextBuilder(token, request);
  response.locals.context = context;

  next();
};
