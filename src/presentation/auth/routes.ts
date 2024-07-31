import { Router } from 'express';
import { AuthController } from './controllers';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    // Define main routes
    router.post('/login', controller.loginUser);

    router.post('/register', controller.registerUser);

    return router;
  }
}
