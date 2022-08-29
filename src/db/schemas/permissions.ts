import mongoose from 'mongoose';
import { Permission } from '~api/models';

const PermissionSchema: mongoose.Schema<Permission> = new mongoose.Schema({
  __v: { type: Number, select: false },
  section: { type: String },
  action: { type: String },
  enabled: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date }
});

PermissionSchema.pre('updateOne', async function () {
  this.set({ updated: new Date() });
});

PermissionSchema.index({ section: 1, action: 1 }, { unique: true });

export interface PermissionQuery {
  action?: string;
  section?: string;
  enabled?: boolean;
}

const PermissionModel = mongoose.model<Permission>('Permission', PermissionSchema);
export { PermissionModel };
