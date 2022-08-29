import { inspect } from 'util';

import { NextFunction, Request, Response } from 'express';

import { STATUS_CODES } from '~constants';

const DEFAULT_STATUS_CODE = STATUS_CODES.INTERNAL_SERVER_ERROR;
const DEFAULT_INTERNAL_CODE = 'unexpected_server_error';
const ERROR_PARSING_BODY = 'error_parsing_body';

function isParseError(error: unknown): error is ParseError {
  const castedError = error as ParseError;
  return castedError.statusCode === STATUS_CODES.BAD_REQUEST && castedError.type === 'entity.parse.failed';
}

function isInternalError(error: unknown): error is InternalError {
  const castedError = error as InternalError;
  return castedError.internalCode !== undefined;
}

export interface ParseError extends Error {
  statusCode: number;
  type: string;
}

export interface InternalMessage {
  message: string;
  code?: number;
}

export interface InternalError {
  internalCode: string;
  errors: InternalMessage[];
  statusCode: number;
  type?: string;
}

export interface InternalErrorPayload {
  error?: Error;
  messages?: InternalMessage[];
}

export type InternalErrorGenerator = (errorPayload?: InternalErrorPayload) => InternalError;

export const createError =
  (internalCode: string, statusCode: number): InternalErrorGenerator =>
    (errorPayload?: InternalErrorPayload): InternalError => {
      errorPayload?.error && console.error(inspect(errorPayload.error));
      return { errors: errorPayload?.messages || [], internalCode, statusCode };
    };

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
): Response | void {
  console.error(error);
  if (isInternalError(error)) {
    return res.status(error.statusCode || DEFAULT_STATUS_CODE).send({ errors: error.errors, internal_code: error.internalCode });
  } else if (isParseError(error)) {
    return res.status(STATUS_CODES.BAD_REQUEST).send({ internal_code: ERROR_PARSING_BODY });
  }

  return res.status(DEFAULT_STATUS_CODE).send({ internal_code: DEFAULT_INTERNAL_CODE });
}
