import { Schema, model } from 'mongoose';
import { IUser, I_user_methods, user_model } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const user_schema = new Schema<IUser, Record<string, never>, I_user_methods>(
  {
    id: { type: String, required: true, isUnique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
    needs_password_change: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

user_schema.methods.user_exist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needs_password_change: 1, role: 1 }
  );

  return user;
};

user_schema.methods.password_matched = async function (
  given_password: string,
  saved_password: string
): Promise<boolean> {
  const password_matched = await bcrypt.compare(given_password, saved_password);

  return password_matched;
};

user_schema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, user_model>('users', user_schema);
