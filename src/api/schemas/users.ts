import { email, firstName, lastName, password, permission, role } from './commons';

export const createUserSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'firstName', 'lastName', 'role'],
    properties: {
      username: {
        ...email
      },
      firstName,
      lastName,
      password,
      role,
      permissions: {
        type: 'array',
        items: permission
      }
    }
  }
};

export const setUserPermissionSchema = {
  body: {
    type: 'array',
    minItems: 1,
    items: permission
  }
};
