/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGeneric_response } from '../../../interfaces/common';
import { I_pagination_options } from '../../../interfaces/paginations';
import Api_Error from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { I_faculty, I_faculty_filters } from './interfaces';
import { faculty_searchable_fields } from './constants';
import { Faculty } from './model';

const get_faculty = async (
  filters: I_faculty_filters,
  paginationOptions: I_pagination_options
): Promise<IGeneric_response<I_faculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: faculty_searchable_fields.map(field => ({
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

  const result = await Faculty.find(conditions)
    .populate('academic_semester')
    .populate('academic_faculty')
    .populate('academic_department')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(conditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const get_faculty_by_id = async (id: string): Promise<I_faculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academic_faculty')
    .populate('academic_department');

  return result;
};

const update_faculty = async (
  id: string,
  payload: Partial<I_faculty>
): Promise<I_faculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new Api_Error(StatusCodes.NOT_FOUND, 'Faculty not found!');
  }

  const { name, ...faculty_data } = payload;

  const updated_faculty_data: Partial<I_faculty> = { ...faculty_data };

  // dynamically handling
  // ____________ name ____________
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const name_key = `name.${key}`;
      (updated_faculty_data as any)[name_key] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updated_faculty_data, {
    new: true,
  });

  return result;
};

const delete_faculty = async (id: string): Promise<I_faculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academic_faculty')
    .populate('academic_department');

  return result;
};

export const faculty_services = {
  get_faculty,
  get_faculty_by_id,
  update_faculty,
  delete_faculty,
};
