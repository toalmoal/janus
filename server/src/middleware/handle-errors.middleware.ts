import { Request,
         Response,
         NextFunction }   from 'express';

import { BaseError }      from 'utils/errors';
import { LoggerFactory }  from '@/logger';

const logger = LoggerFactory('handle-errors.middleware')

export const handleErrors = (error: any, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof BaseError) {
    response
      .status(error.code)
      .send(error.message);
  } else {
    logger.error('Error:', error);
    response
      .status(500)
      .send('Internal server error.');
    }
}
