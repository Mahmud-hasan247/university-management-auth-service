/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination_fields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { send_response } from '../../../shared/sendResponse';
import { student_filterable_fields } from './constants';
import { I_student } from './interface';
import { student_services } from './services';

const get_all_students = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req?.query, student_filterable_fields);
  const pagination_options = pick(req?.query, pagination_fields);

  const result = await student_services?.get_students(
    filters,
    pagination_options
  );
  send_response<I_student[]>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: '',
    meta: result?.meta,
    data: result?.data,
  });
});

const get_single_student = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await student_services?.get_student_by_id(id);

  send_response<I_student>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

const student_update = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req?.body;
  const result = await student_services?.update_student(id, data);

  send_response<I_student>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Student Updated Successfully!',
    data: result,
  });
});

const student_delete = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await student_services?.delete_student(id);

  send_response<I_student>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Student Deleted Successfully!',
    data: result,
  });
});

export const student_controllers = {
  get_all_students,
  get_single_student,
  student_update,
  student_delete,
};
