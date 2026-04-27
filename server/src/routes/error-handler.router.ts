import _                    from 'lodash';
import { Router,
         Request,
         Response,
         NextFunction }     from 'express';

import asyncHandler         from 'express-async-handler';
import { validationResult } from 'express-validator';

export const errorHandlerRouter = (route?: string) => {
  const router: any = Router();
  const methods = ['get', 'post', 'put', 'delete', 'options', 'head', 'all', 'use'];
  methods.forEach(method => {
    const originalRouterFunc = router[method];
    const hookedRouterMethod = async (path: string, ...routeHandlers: any[]) => {
      routeHandlers = _.map(routeHandlers, fn => {
          if (_.isFunction(fn)) {
            return asyncHandler((request: Request, response: Response, next: NextFunction) => {
                const validationErrors = validationResult(request);
                if (validationErrors.isEmpty()) {
                  try {
                      return fn(request, response, next);
                  } catch (error) {
                    next(error);
                  }
                } else {
                  const errors = validationErrors.formatWith(error => error.msg).array();
                  response.status(400).send(errors);
                }
            });
          } else {
            return fn;
          }
      });
      originalRouterFunc.apply(router, [path, ...routeHandlers]);
    };
    router[method] = hookedRouterMethod;
  });
  return router;
}
