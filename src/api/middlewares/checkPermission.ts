import { Request, Response, NextFunction } from 'express';
import { roleNotAuthorizederror } from '~api/errors/authentication';
import { Permission, UserRoles } from '~api/models';
import { STATUS_CODES } from '~constants';

const parsePermission = (permission: string): Permission => {
  const perm = permission.split('.');
  return {
    section: perm[0].toLowerCase(),
    action: perm[1].toLowerCase()
  } as Permission;
};

export const checkPermission = (permissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      if (!req.user) {
        return res.status(STATUS_CODES.UNAUTHORIZED).send(roleNotAuthorizederror());
      }

      if (req.user.role !== UserRoles.CUSTOM) {
        return next();
      }

      for (const permission of permissions) {
        const perm = parsePermission(permission);
        if (req.user.permissions.find((p: Permission) => p.section === perm.section && p.action === perm.action)) return next();
      }
      return res.status(STATUS_CODES.UNAUTHORIZED).send(roleNotAuthorizederror());
    } catch (id) {
      res.status(STATUS_CODES.UNAUTHORIZED).send();
      return;
    }
  };
};
