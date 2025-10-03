import { body }             from 'express-validator';

import AuthController       from 'controller/auth.controller';
import errorHandlerRouter   from 'routes/error-handler.router';


const router = errorHandlerRouter('auth');

router.post('/', [
  body('email', 'Email is required!').isEmail().isLength({ 'max': 256 }),
  body('password', 'Password is required!').isLength({ 'min': 1 })
], AuthController.login);

export default router;
