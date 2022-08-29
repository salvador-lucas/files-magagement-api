/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user: import('../api/models/user').User;
    userId: string;
  }
}
