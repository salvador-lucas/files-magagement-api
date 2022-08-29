import { dateTimeFormat } from '~api/utils';
import { Permission } from '~api/models';
import { DateFormatWithSeconds } from '~constants/common';

export interface SerializedPermission {
  id: string;
  section: string;
  action: string;
  enabled: boolean;
  created: string;
  updated?: string;
}

export function serializePermission(permission: Permission): SerializedPermission {
  return {
    id: permission._id,
    section: permission.section,
    action: permission.action,
    enabled: permission.enabled,
    created: dateTimeFormat(permission.created, DateFormatWithSeconds),
    updated: permission.updated && dateTimeFormat(permission.updated, DateFormatWithSeconds)
  };
}

export function serializePermissionList(permissions: Permission[]): SerializedPermission[] {
  return permissions.map((p) => serializePermission(p));
}
