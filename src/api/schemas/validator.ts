import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvKeywords from 'ajv-keywords';
import addFormats from 'ajv-formats';
import { InternalMessage } from '~api/middlewares/error_handler';

const ajv = new Ajv({ allErrors: true, coerceTypes: true });

addFormats(ajv);
ajvErrors(ajv);
ajvKeywords(ajv, ['transform']);

function formatErrors(errors: ErrorObject[] | null): InternalMessage[] {
  return (
    errors?.map((err: ErrorObject) => ({
      message: `${err.instancePath}: ${err.message || ''}`
    })) || []
  );
}

export function compileSchema(schema: object): ValidateFunction {
  return ajv.compile(schema);
}

export function checkSchema(schemaValidation: ValidateFunction, value: unknown): { valid: boolean; errors: InternalMessage[] } {
  const valid = schemaValidation(value);
  if (valid) return { valid: true, errors: [] };
  return { valid: false, errors: formatErrors(schemaValidation.errors || null) };
}
