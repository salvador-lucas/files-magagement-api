import { DocumentDefinition } from 'mongoose';
import { Permission, User } from '~api/models';
import { UpdateResult } from '~api/models/db';
import { UserModel, UserQuery } from '~db/schemas';
import bcrypt from 'bcrypt';
import config from '~config';

export const storeUser = async (user: DocumentDefinition<User>): Promise<void> => {
  console.info('saving user in database');
  await UserModel.create(user);
  console.info('finished saving user in database');
  return;
};

export const findUserByUsername = async (user: DocumentDefinition<User>, onlyActive?: boolean): Promise<User | null> => {
  console.info('finding user in database');
  const where: UserQuery = {
    username: user.username
  };
  if (onlyActive) {
    where.enabled = true;
  }
  const dbUser = await UserModel.findOne(where);
  console.info('finished finding user in database');
  return dbUser;
};

export const findUserById = async (userId: string, onlyActive?: boolean): Promise<User | null> => {
  console.info('finding user by id');
  const where: UserQuery = {};
  if (onlyActive) {
    where.enabled = true;
  }
  const foundUser = await UserModel.findById(userId).where(where);
  console.info('finished finding user by id');
  return foundUser;
};

export const disableUser = async (userId: string): Promise<UpdateResult> => {
  const disabledUser = await UserModel.updateOne({ _id: userId, enabled: true }, { enabled: false });
  return disabledUser;
};

export const updatePassword = async (userId: string, password: string): Promise<UpdateResult> => {
  const pass = await bcrypt.hash(password, config.api.passSaltRounds);
  return await UserModel.updateOne({ _id: userId, enabled: true }, { password: pass });
};

export const storeUserPermissions = async (userId: string, permissions: Permission[]): Promise<UpdateResult | null> => {
  return await UserModel.updateOne({ _id: userId, enabled: true }, { permissions: permissions });
};
