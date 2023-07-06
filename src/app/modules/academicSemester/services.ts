import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './constants';
import { IAcademicSemester } from './interfaces';
import { AcademicSemester } from './models';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = async (payload: IAcademicSemester) => {
  //
  // ______ checking whether the title and code matched or not __________
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }
  const createdSemester = await AcademicSemester.create(payload);
  if (!createdSemester) {
    throw new Error(
      'Academic Semester is failed to create! please try again...'
    );
  }
  return createdSemester;
};

export default createAcademicSemester;
