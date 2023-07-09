import { SortOrder } from 'mongoose';
import Api_Error from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGeneric_response } from '../../../interfaces/common';
import { I_pagination_options } from '../../../interfaces/paginations';
import {
  academic_semester_searchable_fields,
  academic_semester_title_code_mapper,
} from './constants';
import { I_academic_semester, I_academic_semester_filters } from './interfaces';
import { academic_semester } from './models';
import { StatusCodes } from 'http-status-codes';

const create_academic_semester = async (payload: I_academic_semester) => {
  //
  // ______ checking whether the title and code matched or not __________
  if (academic_semester_title_code_mapper[payload.title] !== payload.code) {
    throw new Api_Error(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }
  const created_semester = await academic_semester.create(payload);
  if (!created_semester) {
    throw new Error(
      'Academic Semester is failed to create! please try again...'
    );
  }
  return created_semester;
};

const get_academic_semesters = async (
  filters: I_academic_semester_filters,
  paginationOptions: I_pagination_options
): Promise<IGeneric_response<I_academic_semester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academic_semester_searchable_fields.map(field => ({
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

  const result = await academic_semester
    .find(conditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await academic_semester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const get_single_semester_by_id = async (
  id: string
): Promise<I_academic_semester | null> => {
  const result = await academic_semester.findById(id);

  return result;
};

const update_semester = async (
  id: string,
  payload: Partial<I_academic_semester>
): Promise<I_academic_semester | null> => {
  // ______ checking whether the title and code matched or not __________
  if (
    payload?.title &&
    payload?.code &&
    academic_semester_title_code_mapper[payload.title] !== payload.code
  ) {
    throw new Api_Error(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await academic_semester.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );

  return result;
};

const delete_semester = async (
  id: string
): Promise<I_academic_semester | null> => {
  const result = await academic_semester.findByIdAndDelete(id);

  return result;
};

export const academic_semester_services = {
  create_academic_semester,
  get_academic_semesters,
  get_single_semester_by_id,
  update_semester,
  delete_semester,
};
