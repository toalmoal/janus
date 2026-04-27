import { body }               from 'express-validator';

import { AuthController }     from 'controller/auth.controller';
import { errorHandlerRouter } from 'routes/error-handler.router';


export const auth = errorHandlerRouter('auth');

auth.post('/', [
  body('service', 'Service is required!').isLength({ 'max': 64 }),
  body('email', 'Email is required!').isEmail().isLength({ 'max': 256 }),
  body('password', 'Password is required!').isLength({ 'min': 1 })
], AuthController.login);

auth.post('/reset-password', [
  body('email', 'Email is required!').isEmail().isLength({ 'max': 256 })
], AuthController.requestPasswordReset);

auth.put('/reset-password', [
  body('code', 'Code is required!').isLength({ 'min': 6, 'max': 6 }),
  body('email', 'Email is required!').isEmail().isLength({ 'max': 256 }),
  body('password', 'New Password is required!').isLength({ 'min': 8 }),
], AuthController.requestPasswordReset);
