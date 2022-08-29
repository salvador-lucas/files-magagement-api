import { createError } from '~api/middlewares/error_handler';
import { STATUS_CODES } from '~constants';

export const AUTHENTICATION_NOT_FOUND = 'authentication_not_found';
export const authenticationNotFoundError = createError(AUTHENTICATION_NOT_FOUND, STATUS_CODES.UNAUTHORIZED);

export const AUTHENTICATION_FAIL = 'authentication_fail';
export const authenticationFailError = createError(AUTHENTICATION_FAIL, STATUS_CODES.UNAUTHORIZED);

export const STRENGTH_PASSWORD_ERROR = 'strength_password_error';
export const strengthPasswordError = createError(STRENGTH_PASSWORD_ERROR, STATUS_CODES.UNPROCESSABLE_ENTITY);

export const USER_EMAIL_EXIST_ERROR = 'user_email_exist_error';
export const userEmailExistError = createError(USER_EMAIL_EXIST_ERROR, STATUS_CODES.CONFLICT);

export const ROLE_ACCESS_NOT_AUTHORIZED = 'role_access_not_authorized';
export const roleNotAuthorizederror = createError(ROLE_ACCESS_NOT_AUTHORIZED, STATUS_CODES.UNAUTHORIZED);
