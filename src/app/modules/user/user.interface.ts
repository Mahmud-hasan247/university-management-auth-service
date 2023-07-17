import { Model, Types } from 'mongoose';
import { I_student } from '../student/interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | I_student;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
  needs_password_change?: boolean;
};

export type I_user_methods = {
  user_exist(id: string): Promise<Partial<IUser> | null>;
  password_matched(
    given_password: string,
    saved_password: string
  ): Promise<boolean>;
};
export type user_model = Model<IUser, Record<string, unknown>, I_user_methods>;
