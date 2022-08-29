import { Router } from 'express';
import { handlePermissionCreate, handlePermissionsList } from '~api/controllers/permissions';
import { checkJwt } from '~api/middlewares/checkjwt';
import { checkRole } from '~api/middlewares/checkRole';
import { validateSchema } from '~api/middlewares/schema';
import { getUser } from '~api/middlewares/users';
import { UserRoles } from '~api/models';
import { createPermissionSchema, listPermissionSchema } from '~api/schemas/permissions';

const route = Router();

export default function generatePermissionRoutes(app: Router): void {
  app.use('/permissions', route);
  route.post(
    '/',
    [checkJwt, validateSchema(createPermissionSchema), getUser, checkRole([UserRoles.ADMIN])],
    handlePermissionCreate
  );
  route.get('/', [checkJwt, validateSchema(listPermissionSchema), getUser, checkRole([UserRoles.ADMIN])], handlePermissionsList);
}
