import { Router } from 'express';
import { handleChangePassword, handleLogin } from '~api/controllers/auth';
import { checkJwt } from '~api/middlewares/checkjwt';
import { validateSchema } from '~api/middlewares/schema';
import { getUser } from '~api/middlewares/users';
import { changePasswordSchema, loginSchema } from '~api/schemas/auth';

const route = Router();

export default function generateAuthRoutes(app: Router): void {
  app.use('/auth', route);
  route.post('/login', [validateSchema(loginSchema)], handleLogin);
  route.put('/change_password', [checkJwt, validateSchema(changePasswordSchema), getUser], handleChangePassword);
}
