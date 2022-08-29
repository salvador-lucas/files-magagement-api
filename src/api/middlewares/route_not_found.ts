import { NextFunction, Request, Response } from 'express';
import { routeNotFoundError } from '~api/errors';

export function routeNotFound(req: Request, res: Response, next: NextFunction): Response | void {
  return next(routeNotFoundError());
}
