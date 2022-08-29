import { createError } from '~api/middlewares/error_handler';
import { STATUS_CODES } from '~constants';

export const USER_ALREADY_EXISTS = 'users_already_exists';
export const userAlreadyExistsError = createError(USER_ALREADY_EXISTS, STATUS_CODES.BAD_REQUEST);

export const USER_NOT_FOUND = 'user_not_found';
export const userNotFoundError = createError(USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);

export const USER_PERMISSIONS_DUPLICATED = 'user_permissions_duplicated';
export const userPersmissionExistsError = createError(USER_PERMISSIONS_DUPLICATED, STATUS_CODES.BAD_REQUEST);
