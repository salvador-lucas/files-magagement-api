import { Router } from 'express';
import { handleUserCreate, handleUserDelete, handleUserDeletePermission, handleUserSetPermission } from '~api/controllers/users';
import { checkJwt } from '~api/middlewares/checkjwt';
import { checkRole } from '~api/middlewares/checkRole';
import { validateSchema } from '~api/middlewares/schema';
import { getUser } from '~api/middlewares/users';
import { UserRoles } from '~api/models';
import { createUserSchema, setUserPermissionSchema } from '~api/schemas/users';

const route = Router();

export default function generateUserRoutes(app: Router): void {
  app.use('/users', route);
  route.post('/', [validateSchema(createUserSchema)], handleUserCreate);
  route.delete('/:userId', [checkJwt, getUser, checkRole([UserRoles.ADMIN])], handleUserDelete);
  route.post(
    '/:userId/permissions',
    [validateSchema(setUserPermissionSchema), checkJwt, getUser, checkRole([UserRoles.ADMIN])],
    handleUserSetPermission
  );
  route.delete(
    '/:userId/permissions',
    [validateSchema(setUserPermissionSchema), checkJwt, getUser, checkRole([UserRoles.ADMIN])],
    handleUserDeletePermission
  );
}
