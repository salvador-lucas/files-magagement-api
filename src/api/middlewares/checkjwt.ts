import { Request, Response, NextFunction } from 'express';
import { authenticationFailError, authenticationNotFoundError } from '~api/errors/authentication';
import { STATUS_CODES } from '~constants';
import * as fs from 'fs';
import * as path from 'path';
import { Secret, sign, verify } from 'jsonwebtoken';
const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));

export const SECRET_KEY: Secret = privateKey;

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  let jwtPayload;
  const authHeader = req.header('Authorization');
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!authHeader || !token || !authHeader.includes('Bearer')) {
    res.status(STATUS_CODES.UNAUTHORIZED).send(authenticationNotFoundError());
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwtPayload = verify(token, SECRET_KEY) as any;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(STATUS_CODES.UNAUTHORIZED).send(authenticationFailError());
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = sign({ userId, username }, SECRET_KEY, {
    expiresIn: '24h'
  });
  req.userId = jwtPayload.userId;
  res.setHeader('token', newToken);

  next();
};
