import { Router } from 'express';
import generateRoutes from './routes';

export default function generateAppRoutes(): Router {
  return generateRoutes();
}
