import { dateTimeFormat } from '~api/utils';
import { Permission, User, UserRoles } from '~api/models';

export interface SerializedUser {
  id: string;
  username: string;
  password: string;
  role: UserRoles;
  permissions: Permission[];
  enabled: boolean;
  created: string;
  updated?: string;
}

export function serializeUser(user: User): SerializedUser {
  return {
    id: user._id,
    username: user.username,
    password: user.password,
    role: user.role,
    permissions: user.permissions,
    enabled: user.enabled,
    created: dateTimeFormat(user.created, 'YYYY-mm-dd HH:mm'),
    updated: user.updated && dateTimeFormat(user.updated, 'YYYY-mm-dd HH:mm')
  };
}
