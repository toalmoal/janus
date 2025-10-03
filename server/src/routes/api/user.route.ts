import checkRole            from 'middleware/check-role.middleware';
import UserController       from 'controller/user.controller';
import errorHandlerRouter   from 'routes/error-handler.router';

const router = errorHandlerRouter();

router.post('/search', [checkRole('Admin')], UserController.findAll);

export default router;
