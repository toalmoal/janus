import { StatusController }     from 'controller/status.controller';
import { errorHandlerRouter }   from 'routes/error-handler.router';

export const status = errorHandlerRouter();

status.get('/', [], StatusController.get);
