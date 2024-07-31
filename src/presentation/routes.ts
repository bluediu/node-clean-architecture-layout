import { Router } from 'express';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Define main routes
    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
