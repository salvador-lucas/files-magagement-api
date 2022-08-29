import { inspect } from 'util';

import { RequestHandler, Request, Response, NextFunction } from 'express';

import { schemaError } from '~api/errors';
import { compileSchema, checkSchema } from '~api/schemas/validator';

export interface RequestSchema {
  headers?: object;
  body?: object;
  query?: object;
  params?: object;
  locals?: object;
}

function baseSchema(schema: object): object {
  return {
    type: 'object',
    required: Object.keys(schema),
    properties: {
      ...schema
    }
  };
}

export function validateSchema(schema: RequestSchema): RequestHandler {
  const validationFunction = compileSchema(baseSchema(schema));
  return (req: Request, res: Response, next: NextFunction): void => {
    console.info('Start schema validation...');
    const schemaResult = checkSchema(validationFunction, req);
    if (schemaResult.valid) {
      console.info('Finish schema validation');
      return next();
    }
    console.error(`Fail schema validation with errors: ${inspect(schemaResult.errors)}`);
    return next(schemaError({ messages: schemaResult.errors }));
  };
}
