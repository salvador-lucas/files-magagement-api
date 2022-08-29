import { NextFunction, Request, Response } from 'express';
import { changePassword, login } from '~api/services/auth';
import { STATUS_CODES } from '~constants';

export const handleLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const loggedUser = await login(req.body);
    return res.status(STATUS_CODES.OK).send(loggedUser);
  } catch (error) {
    return next(error);
  }
};

export const handleChangePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await changePassword(req.userId, req.body.password);
    return res.status(STATUS_CODES.OK).send({ status: 'sucess' });
  } catch (error) {
    return next(error);
  }
};
