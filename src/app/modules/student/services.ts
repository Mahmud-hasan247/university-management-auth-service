/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGeneric_response } from '../../../interfaces/common';
import { I_pagination_options } from '../../../interfaces/paginations';
import { student_searchable_fields } from './constants';
import { I_student, I_student_filters } from './interface';
import { Student } from './model';
import Api_Error from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const get_students = async (
  filters: I_student_filters,
  paginationOptions: I_pagination_options
): Promise<IGeneric_response<I_student[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: student_searchable_fields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData)?.map(([field, value]) => ({
        [field]: { $regex: value, $options: 'i' },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const conditions = andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(conditions)
    .populate('academic_semester')
    .populate('academic_faculty')
    .populate('academic_department')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(conditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const get_student_by_id = async (id: string): Promise<I_student | null> => {
  const result = await Student.findById(id)
    .populate('academic_semester')
    .populate('academic_faculty')
    .populate('academic_department');

  return result;
};

const update_student = async (
  id: string,
  payload: Partial<I_student>
): Promise<I_student | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new Api_Error(StatusCodes.NOT_FOUND, 'Student not found!');
  }

  const { name, parents, guardian, ...student_data } = payload;

  const updated_student_data: Partial<I_student> = { ...student_data };

  // dynamically handling
  // ____________ name ____________
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const name_key = `name.${key}`;
      (updated_student_data as any)[name_key] = name[key as keyof typeof name];
    });
  }

  // ______ parents ______________
  if (parents && Object.keys(parents).length > 0) {
    Object.keys(parents).forEach(key => {
      const parents_key = `parents.${key}`;
      (updated_student_data as any)[parents_key] =
        parents[key as keyof typeof parents];
    });
  }

  // ___________ guardian ____________
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardian_key = `guardian.${key}`;
      (updated_student_data as any)[guardian_key] =
        guardian[key as keyof typeof guardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updated_student_data, {
    new: true,
  });

  return result;
};

const delete_student = async (id: string): Promise<I_student | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academic_semester')
    .populate('academic_faculty')
    .populate('academic_department');

  return result;
};

export const student_services = {
  get_students,
  get_student_by_id,
  update_student,
  delete_student,
};
