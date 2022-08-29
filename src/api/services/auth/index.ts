import { DocumentDefinition } from 'mongoose';
import { LoginUser, User } from '~api/models';
import { findUserByUsername, updatePassword } from '~api/repositories/users';
import { databaseErrorHandler } from '~db/utils/error_handler';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { authenticationFailError } from '~api/errors/authentication';
import { SECRET_KEY } from '~api/middlewares/checkjwt';
import { userNotFoundError } from '~api/errors/users';

export const login = async (user: DocumentDefinition<User>): Promise<LoginUser> => {
  const foundUser = await findUserByUsername(user, true).catch(databaseErrorHandler);
  if (!foundUser) {
    throw authenticationFailError();
  }

  const isMatch = bcrypt.compareSync(user.password, foundUser.password);

  if (isMatch) {
    const token = sign({ userId: foundUser._id?.toString(), username: foundUser.username }, SECRET_KEY, {
      expiresIn: '24h'
    });

    const loggedUser: LoginUser = {
      token
    };

    return loggedUser;
  } else {
    throw authenticationFailError();
  }
};

export const changePassword = async (userId: string, newPassword: string): Promise<void> => {
  const updated = await updatePassword(userId, newPassword).catch(databaseErrorHandler);
  if (!updated) {
    throw userNotFoundError();
  }
};
