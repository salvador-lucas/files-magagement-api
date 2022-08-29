import { DocumentDefinition } from 'mongoose';
import { userAlreadyExistsError, userNotFoundError, userPersmissionExistsError } from '~api/errors/users';
import { User, Permission } from '~api/models';
import { ErrnoException } from '~api/models/error';
import { disableUser, storeUser, storeUserPermissions } from '~api/repositories/users';
import { DB_ERRORS } from '~db/utils/error_codes';
import { databaseErrorHandler } from '~db/utils/error_handler';
import _ from 'lodash';
import { permissionNotFoundError } from '~api/errors/permissions';

export const createUser = async (user: DocumentDefinition<User>): Promise<void> => {
  try {
    await storeUser(user);
  } catch (e) {
    const err = e as ErrnoException;
    if (err.code === DB_ERRORS.DUPLICATE_KEY) {
      throw userAlreadyExistsError();
    }
    databaseErrorHandler(err);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  const { matchedCount } = await disableUser(userId).catch(databaseErrorHandler);
  if (!matchedCount) throw userNotFoundError();
};

export const getUserById = async (userId: string): Promise<User> => {
  return await getUserById(userId).catch(databaseErrorHandler);
};

export const setUserPermission = async (user: User, permissions: Permission[]): Promise<void> => {
  const newPermissions = _.unionBy(user.permissions, permissions, (p: Permission) => `${p.section}.${p.action}`);

  if (_.isEqual(user.permissions, permissions)) {
    throw userPersmissionExistsError();
  }
  const updatedUserPerms = await storeUserPermissions(user.id, newPermissions).catch(databaseErrorHandler);

  if (!updatedUserPerms) throw userNotFoundError();
  return;
};

export const deleteUserPermission = async (user: User, permissions: Permission[]): Promise<void> => {
  const diff = _.differenceWith(permissions, user.permissions, _.isEqual);

  if (diff.length) {
    const messages = diff.map((p) => {
      return { message: `${p.section}.${p.action} not found` };
    });
    throw permissionNotFoundError({ messages: messages });
  }
  const newPermissions = permissions.filter((p) => !user.permissions.includes(p));
  const updatedUserPerms = await storeUserPermissions(user.id, newPermissions).catch(databaseErrorHandler);

  if (!updatedUserPerms) throw userNotFoundError();
  return;
};
