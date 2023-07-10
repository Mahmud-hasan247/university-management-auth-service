import { Model, Types } from 'mongoose';
import { I_student } from '../student/interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | I_student;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type user_model = Model<IUser, Record<string, unknown>>;
