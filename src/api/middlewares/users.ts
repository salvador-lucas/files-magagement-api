import { Request, Response, NextFunction } from 'express';
import { userNotFoundError } from '~api/errors/users';
import { findUserById } from '~api/repositories/users';

export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await findUserById(req.userId, true);
    if (!user) {
      throw userNotFoundError();
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}
