import { checkRole }            from 'middleware/check-role.middleware';
import { UserController }       from 'controller/user.controller';
import { errorHandlerRouter }   from 'routes/error-handler.router';

export const user = errorHandlerRouter();

user.post('/search', [checkRole('Admin', true)], UserController.findAll);

user.post('/', [checkRole('Admin', true)], UserController.insert);

user.put('/', [checkRole('Admin', true)], UserController.update);
