import mongoose from 'mongoose';
import { User } from '~api/models';
import bcrypt from 'bcrypt';
import config from '~config';
import { UserRole } from 'aws-sdk/clients/workmail';

const saltRounds = config.api.passSaltRounds;

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
  __v: { type: Number, select: false },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String },
  permissions: { type: [mongoose.Schema.Types.Mixed] },
  enabled: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

UserSchema.pre('updateOne', async function () {
  this.set({ updated: new Date() });
});
export interface UserQuery {
  username?: string;
  enabled?: boolean;
  role?: UserRole;
}

const UserModel = mongoose.model<User>('User', UserSchema);

export { UserModel };
