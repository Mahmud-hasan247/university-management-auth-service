import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config';
import Api_Error from '../../../errors/ApiError';
import { academic_semester } from '../academicSemester/models';
import { I_faculty } from '../faculty/interfaces';
import { Faculty } from '../faculty/model';
import { I_student } from '../student/interface';
import { Student } from './../student/model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generate_faculty_id, generate_student_Id } from './user.utils';

const create_student = async (
  student: I_student,
  user: IUser
): Promise<IUser | null> => {
  let user_all_data = null;

  // default password
  if (!user.password) {
    user.password = config.student_student_password as string;
  }

  // set role
  user.role = 'student';
  // generate student id
  const Academic_Semester = await academic_semester.findById(
    student.academic_semester
  );
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // auto generated incremental id
    const id = await generate_student_Id(Academic_Semester);
    user.id = id;
    student.id = id;

    // student create
    const created_student = await Student.create([student], { session });
    if (!created_student?.length) {
      throw new Api_Error(
        StatusCodes.BAD_GATEWAY,
        'Failed to create student! Try again...'
      );
    }

    // set student reference to user
    user.student = created_student[0]._id;

    // user create
    const created_user = await User.create([user], { session });

    if (!created_user?.length) {
      throw new Api_Error(
        StatusCodes.BAD_REQUEST,
        'Failed to create user! Try again...'
      );
    }

    user_all_data = created_user[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (user_all_data) {
    user_all_data = await User.findOne({ id: user_all_data?.id }).populate({
      path: 'student',
      populate: [
        { path: 'academic_semester' },
        { path: 'academic_department' },
        { path: 'academic_faculty' },
      ],
    });
  }
  return user_all_data;
};
//
//
// ______________________      FACULTY CREATION         __________________________
const create_faculty = async (
  faculty: I_faculty,
  user: IUser
): Promise<IUser | null> => {
  let user_all_data = null;

  // default password
  if (!user.password) {
    user.password = config.student_student_password as string;
  }

  // set role
  user.role = 'faculty';
  // generate student id

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // auto generated incremental id
    const id = await generate_faculty_id();
    user.id = id;
    faculty.id = id;

    // student create
    const created_faculty = await Faculty.create([faculty], { session });
    if (!created_faculty?.length) {
      throw new Api_Error(
        StatusCodes.BAD_GATEWAY,
        'Failed to create faculty! Try again...'
      );
    }

    // set student reference to user
    user.faculty = created_faculty[0]._id;

    // user create
    const created_user = await User.create([user], { session });

    if (!created_user?.length) {
      throw new Api_Error(
        StatusCodes.BAD_REQUEST,
        'Failed to create user! Try again...'
      );
    }

    user_all_data = created_user[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (user_all_data) {
    user_all_data = await User.findOne({ id: user_all_data?.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academic_department' }, { path: 'academic_faculty' }],
    });
  }
  return user_all_data;
};

export const user_services = {
  create_student,
  create_faculty,
};
