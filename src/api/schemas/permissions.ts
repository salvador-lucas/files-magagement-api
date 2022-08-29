import { Actions } from '~constants/permissions';
import { permission } from './commons';

export const createPermissionSchema = {
  body: {
    type: 'array',
    minItems: 1,
    items: permission
  }
};

export const listPermissionSchema = {
  query: {
    type: 'object',
    properties: {
      section: {
        type: 'string'
      },
      action: {
        enum: Object.values(Actions)
      }
    }
  }
};
