/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination_fields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { send_response } from '../../../shared/sendResponse';
import { faculty_services } from './services';
import { I_faculty } from './interfaces';
import { faculty_filterable_fields } from './constants';

const get_all_faculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req?.query, faculty_filterable_fields);
  const pagination_options = pick(req?.query, pagination_fields);

  const result = await faculty_services?.get_faculty(
    filters,
    pagination_options
  );
  send_response<I_faculty[]>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: '',
    meta: result?.meta,
    data: result?.data,
  });
});

const get_single_faculty = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await faculty_services?.get_faculty_by_id(id);

  send_response<I_faculty>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

const faculty_update = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req?.body;
  const result = await faculty_services?.update_faculty(id, data);

  send_response<I_faculty>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Faculty Updated Successfully!',
    data: result,
  });
});

const faculty_delete = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await faculty_services?.delete_faculty(id);

  send_response<I_faculty>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Faculty Deleted Successfully!',
    data: result,
  });
});

export const faculty_controllers = {
  get_all_faculties,
  get_single_faculty,
  faculty_update,
  faculty_delete,
};
