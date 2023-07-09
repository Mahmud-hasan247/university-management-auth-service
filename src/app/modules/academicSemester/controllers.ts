/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { send_response } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academic_semester_services } from './services';
import pick from '../../../shared/pick';
import { pagination_fields } from '../../../constants/pagination';
import { I_academic_semester } from './interfaces';
import { academic_semester_filterable_fields } from './constants';

const academic_semester_create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academic_semester_services?.create_academic_semester(
      academicSemesterData
    );

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
  }
);

const get_all_academic_semesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req?.query, academic_semester_filterable_fields);
    const pagination_options = pick(req?.query, pagination_fields);

    const result = await academic_semester_services?.get_academic_semesters(
      filters,
      pagination_options
    );
    send_response<I_academic_semester[]>(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: '',
      meta: result?.meta,
      data: result?.data,
    });
  }
);

const get_single_semester = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await academic_semester_services?.get_single_semester_by_id(
    id
  );

  send_response<I_academic_semester>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

const semester_update = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req?.body;
  const result = await academic_semester_services?.update_semester(id, data);

  send_response<I_academic_semester>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Semester Updated Successfully!',
    data: result,
  });
});

const semester_delete = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await academic_semester_services?.delete_semester(id);

  send_response<I_academic_semester>(res, {
    status_code: StatusCodes.OK,
    success: true,
    message: 'Semester Deleted Successfully!',
    data: result,
  });
});

export const academic_semester_controllers = {
  academic_semester_create,
  get_all_academic_semesters,
  get_single_semester,
  semester_update,
  semester_delete,
};
