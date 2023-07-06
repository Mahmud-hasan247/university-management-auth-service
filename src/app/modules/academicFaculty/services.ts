import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IAcademic_faculty } from './interfaces';
import { academic_faculty } from './models';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { SortOrder } from 'mongoose';

const create_academic_faculty = async (payload: IAcademic_faculty) => {
  const result = await academic_faculty.create(payload);

  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create Academic Faculty. Please try again...'
    );
  }

  return result;
};

const get_academic_faculties = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademic_faculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await academic_faculty.find().sort().skip(skip).limit(limit);
  const total = await academic_faculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const single_academic_faculty = async (id: string) => {
  // here is missing the return type
  const result = await academic_faculty.findById(id);

  return result;
};

const update_academic_faculty = async (
  id: string,
  payload: IAcademic_faculty
) => {
  // here is missing the return type
  const isExist = await academic_faculty.findOne({ title: payload?.title });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Academic faculty already exist!');
  }

  const isNotExist = await academic_faculty.findById(id);
  if (!isNotExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Academic faculty not exist!');
  }

  const result = await academic_faculty.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  return result;
};

const delete_academic_faculty = async (id: string) => {
  // here is missing the return type
  const result = await academic_faculty.findByIdAndDelete(id);

  return result;
};
export const academic_faculty_services = {
  create_academic_faculty,
  get_academic_faculties,
  update_academic_faculty,
  single_academic_faculty,
  delete_academic_faculty,
};
