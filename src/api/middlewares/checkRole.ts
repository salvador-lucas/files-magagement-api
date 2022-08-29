import { Request, Response, NextFunction } from 'express';
import { roleNotAuthorizederror } from '~api/errors/authentication';
import { STATUS_CODES } from '~constants';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      if (!req.user || !roles.includes(req.user.role))
        return res.status(STATUS_CODES.UNAUTHORIZED).send(roleNotAuthorizederror());
      return next();
    } catch (id) {
      res.status(STATUS_CODES.UNAUTHORIZED).send();
      return;
    }
  };
};
