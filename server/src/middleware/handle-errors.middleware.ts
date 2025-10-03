import { Request,
         Response,
         NextFunction }     from 'express';

import { BaseError }        from 'utils/errors';
import { LoggerFactory }    from '@/logger';
import ServerResponse       from 'view/server-response.view';

const logger = LoggerFactory('handle-errors.middleware')

const handleErrors = (error: any, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof BaseError) {
    response
      .status(error.code)
      .send(ServerResponse.failure(error.message));
  } else {
    logger.error('Error:', error);
    response
      .status(500)
      .send(ServerResponse.failure('Internal server error.'));
    }
}
export default handleErrors;
