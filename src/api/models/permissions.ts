import mongoose from 'mongoose';
import { Actions } from '~constants/permissions';

export interface Permission extends mongoose.Document {
  section: string;
  action: Actions.READ | Actions.WRITE | Actions.CREATE | Actions.DELETE;
  enabled: boolean;
  created: Date;
  updated?: Date;
}
