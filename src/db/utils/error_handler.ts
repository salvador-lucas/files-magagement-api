import { serviceUnavailableError } from '~api/errors';
import { ErrnoException } from '~api/models/error';

export function databaseErrorHandler(err: ErrnoException | Error): never {
  console.error(`Fail database query because of: ${err?.message}`);
  throw serviceUnavailableError({ error: err });
}
