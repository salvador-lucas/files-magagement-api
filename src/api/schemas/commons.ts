import { UserRoles } from '~api/models';
import { Actions } from '~constants/permissions';

export const dni = {
  type: 'string',
  example: '36740209',
  minLength: 6,
  maxLength: 9,
  pattern: '^[1-9][0-9]{5,8}$',
  errorMessage: {
    pattern: 'DNI format is invalid'
  }
};

export const email = {
  type: 'string',
  format: 'email',
  transform: ['toLowerCase'],
  errorMessage: {
    format: 'email format is invalid'
  }
};

export const password = {
  type: 'string',
  pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,12}$',
  format: 'password',
  errorMessage: {
    pattern:
      'Password error: It must contain between 6 and 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
  }
};

export const firstName = {
  type: 'string',
  maxLength: 30,
  pattern: '^(?!.*:,)[A-Za-zÀ-ÖØ-öø-ÿ\' ]+$',
  errorMessage: {
    pattern: 'First name format is invalid: should be only words and no more than 30 characters'
  }
};

export const lastName = {
  type: 'string',
  maxLength: 30,
  pattern: '^(?!.*:,)[A-Za-zÀ-ÖØ-öø-ÿ\' ]+$',
  errorMessage: {
    pattern: 'Last name format is invalid: should be only words and no more than 30 characters'
  }
};

export const role = {
  type: 'string',
  transform: ['toUpperCase'],
  enum: Object.values(UserRoles)
};

export const permission = {
  type: 'object',
  required: ['section', 'action'],
  properties: {
    section: {
      type: 'string'
    },
    action: {
      enum: Object.values(Actions)
    }
  }
};
