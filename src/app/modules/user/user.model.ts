import { Schema, model } from 'mongoose';
import { IUser, user_model } from './user.interface';

const user_schema = new Schema<IUser>(
  {
    id: { type: String, required: true, isUnique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, user_model>('users', user_schema);
