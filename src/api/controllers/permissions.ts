import { NextFunction, Request, Response } from 'express';
import { serializePermissionList } from '~api/serializers';
import { createPermission, deletePermission, listPermissions } from '~api/services/permissions';
import { STATUS_CODES } from '~constants';

export const handlePermissionCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await createPermission(req.body);
    return res.status(STATUS_CODES.CREATED).send();
  } catch (error) {
    return next(error);
  }
};

export const handlePermissionsList = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const response = await listPermissions(req.query);
    return res.status(STATUS_CODES.OK).send(serializePermissionList(response));
  } catch (error) {
    return next(error);
  }
};

export const handleDelePermission = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await deletePermission(req.params.permissionId);
    return res.status(STATUS_CODES.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

// export const handleUpdatePermission = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     await createUser(req.body);
//     return res.status(STATUS_CODES.CREATED).send({ status: 'success' });
//   } catch (error) {
//     return next(error);
//   }
// };
