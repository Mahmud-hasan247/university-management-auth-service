import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
};

export type user_model = Model<IUser, Record<string, unknown>>;
