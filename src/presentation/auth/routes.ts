import { Router } from 'express';
import { AuthController } from './controllers';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    // Define main routes
    router.post('/login', controller.loginUser);

    router.post('/register', controller.registerUser);

    return router;
  }
}
