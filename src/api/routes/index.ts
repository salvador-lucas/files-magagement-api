import { Router } from 'express';
import generateHealthRoute from '~routes/health';
import generateAuthRoutes from '~routes/auth';
import generateUserRoutes from '~routes/users';
import generatePermissionRoutes from '~routes/permissions';

const router = Router();

const generateRoutes = (): Router => {
  //health routes
  generateHealthRoute(router);

  //auth routes
  generateAuthRoutes(router);

  //user routes
  generateUserRoutes(router);

  //permission routes
  generatePermissionRoutes(router);

  return router;
};

export default generateRoutes;
