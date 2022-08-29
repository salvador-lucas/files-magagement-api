import { email, password } from './commons';

export const changePasswordSchema = {
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password
    }
  }
};

export const loginSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        ...email
      },
      password
    }
  }
};
