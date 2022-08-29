import { permissionAlreadyExistsError, permissionNotFoundError } from '~api/errors/permissions';
import { Permission } from '~api/models';
import { ErrnoException } from '~api/models/error';
import { disablePermission, getPermissions, storePermission } from '~api/repositories/permissions';
import { PermissionQuery } from '~db/schemas/permissions';
import { DB_ERRORS } from '~db/utils/error_codes';
import { databaseErrorHandler } from '~db/utils/error_handler';

export async function createPermission(permission: Permission[]): Promise<void> {
  try {
    await storePermission(permission);
  } catch (e) {
    const err = e as ErrnoException;
    if (err.code === DB_ERRORS.DUPLICATE_KEY) {
      throw permissionAlreadyExistsError();
    }
    databaseErrorHandler(err);
  }
}

export async function listPermissions(query: PermissionQuery): Promise<Permission[]> {
  return await getPermissions(query).catch(databaseErrorHandler);
}

export async function deletePermission(permissionId: string): Promise<void> {
  const deletedPermission = await disablePermission(permissionId).catch(databaseErrorHandler);
  if (!deletedPermission) throw permissionNotFoundError();
}

// export async function getUserById(userId: string): Promise<User> {
//   return await getUserById(userId).catch(databaseErrorHandler);
// }
