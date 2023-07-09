import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { I_pagination_options } from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGeneric_response } from '../../../interfaces/common';
import { SortOrder } from 'mongoose';
import {
  IAcademic_department,
  IAcademic_department_filters,
} from './interfaces';
import { academic_department } from './models';
import { academic_department_searchable_fields } from './constants';

const create_academic_department = async (payload: IAcademic_department) => {
  const result = (await academic_department.create(payload)).populate(
    'academic_faculty'
  );

  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create Academic department. Please try again...'
    );
  }

  return result;
};

const get_academic_departments = async (
  filters: IAcademic_department_filters,
  paginationOptions: I_pagination_options
): Promise<IGeneric_response<IAcademic_department[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academic_department_searchable_fields.map(field => ({
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

  const result = await academic_department
    .find(conditions)
    .populate('academic_faculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await academic_department.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result as IAcademic_department[],
  };
};

const single_academic_department = async (id: string) => {
  // here is missing the return type
  const result = (await academic_department.findById(id))?.populate(
    'academic_faculty'
  );

  return result;
};

const update_academic_department = async (
  id: string,
  payload: IAcademic_department
) => {
  // here is missing the return type
  const isExist = await academic_department.findOne({ title: payload?.title });
  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic department already exist!'
    );
  }

  const isNotExist = await academic_department.findById(id);
  if (!isNotExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Academic department not exist!');
  }

  const result = await academic_department
    .findByIdAndUpdate({ _id: id }, payload, { new: true })
    .populate('academic_faculty');

  return result;
};

const delete_academic_department = async (id: string) => {
  // here is missing the return type
  const result = await academic_department.findByIdAndDelete(id);

  return result;
};
export const academic_department_services = {
  create_academic_department,
  get_academic_departments,
  update_academic_department,
  single_academic_department,
  delete_academic_department,
};
