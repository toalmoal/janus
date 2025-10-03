import StatusController     from 'controller/status.controller';
import errorHandlerRouter   from 'routes/error-handler.router';

const router = errorHandlerRouter();

router.get('/', [], StatusController.get);

export default router;
