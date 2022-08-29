import { DocumentDefinition } from 'mongoose';
import { Permission } from '~api/models';
import { UpdateResult } from '~api/models/db';
import { PermissionModel, PermissionQuery } from '~db/schemas';

export const storePermission = async (permission: DocumentDefinition<Permission>[]): Promise<void> => {
  console.info('storing permission in database');
  await PermissionModel.create(permission);
  console.info('finished storing permission in database');
  return;
};

export const getPermissions = async (query: DocumentDefinition<PermissionQuery>, onlyActive?: boolean): Promise<Permission[]> => {
  console.info('getting permissions from database');
  if (onlyActive) {
    query.enabled = true;
  }
  return await PermissionModel.find(query);
};

export const disablePermission = async (permissionId: string): Promise<UpdateResult> => {
  console.info('removing permissions from database');
  const disabledUser = await PermissionModel.updateOne({ _id: permissionId, enabled: true }, { enabled: false });
  return disabledUser;
};
