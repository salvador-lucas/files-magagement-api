import { NextFunction, Request, Response } from 'express';
import { createUser, deleteUser, deleteUserPermission, setUserPermission } from '~api/services/users';
import { STATUS_CODES } from '~constants';

export const handleUserCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await createUser(req.body);
    return res.status(STATUS_CODES.CREATED).send();
  } catch (error) {
    return next(error);
  }
};

export const handleUserDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await deleteUser(req.params.userId);
    return res.status(STATUS_CODES.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

export const handleUserSetPermission = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await setUserPermission(req.user, req.body);
    return res.status(STATUS_CODES.OK).send();
  } catch (error) {
    return next(error);
  }
};

export const handleUserDeletePermission = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await deleteUserPermission(req.user, req.body);
    return res.status(STATUS_CODES.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
