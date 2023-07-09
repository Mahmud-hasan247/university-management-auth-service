import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generate_student_Id } from './user.utils';

const create_user = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generate_student_Id();

  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.student_user_password as string;
  }

  // ______ inserting a user to database ________
  const created_user = await User.create(user);

  //  ______ if insertion is failed _________
  if (!created_user) {
    throw new Error('failed to creating user!');
  }

  //  _____ returning the created user ______
  return created_user;
};

export const user_services = {
  create_user,
};
