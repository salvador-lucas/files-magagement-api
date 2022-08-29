import { Router } from 'express';
import { healthCheck } from '~api/controllers/health';

const route = Router();

const generateHealthRoute = (app: Router): void => {
  app.use('/health', route);
  route.get('/', healthCheck);
};

export default generateHealthRoute;
