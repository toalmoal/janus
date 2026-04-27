import { Router }       from 'express';

import { auth }         from './auth.route';
import { user }         from './user.route';
import { status }       from './status.route';

export const apiRoutes = Router();

apiRoutes.use('/auth', auth);
apiRoutes.use('/user', user);
apiRoutes.use('/status', status);
