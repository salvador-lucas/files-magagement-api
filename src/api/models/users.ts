import mongoose from 'mongoose';
import { Permission } from './permissions';

export interface User extends mongoose.Document {
  username: string;
  password: string;
  role: UserRoles;
  permissions: Permission[];
  enabled: boolean;
  created: Date;
  updated?: Date;
}

export interface LoginUser {
  token: string;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  DEV = 'DEV',
  USER = 'USER',
  GUEST = 'GUEST',
  CUSTOM = 'CUSTOM'
}
