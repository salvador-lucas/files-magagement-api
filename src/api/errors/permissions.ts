import { createError } from '~api/middlewares/error_handler';
import { STATUS_CODES } from '~constants';

export const PERMISSION_ALREADY_EXISTS = 'permission_already_exists';
export const permissionAlreadyExistsError = createError(PERMISSION_ALREADY_EXISTS, STATUS_CODES.BAD_REQUEST);

export const PERMISSION_NOT_FOUND = 'permission_not_found';
export const permissionNotFoundError = createError(PERMISSION_NOT_FOUND, STATUS_CODES.NOT_FOUND);
