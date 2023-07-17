import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pagination_fields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { send_response } from '../../../shared/sendResponse';
import { academic_faculty_services } from './services';
import { academic_faculty_filterable_fields } from './constants';

const academic_faculty_create = catchAsync(
  async (req: Request, res: Response) => {
    const data = req?.body;
    const result = await academic_faculty_services?.create_academic_faculty(
      data
    );

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty Created Successfully!',
      data: result,
    });
  }
);

const academic_faculties_get = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.user, 'auth token');

    const filters = pick(req?.query, academic_faculty_filterable_fields);
    const pagination_options = pick(req?.query, pagination_fields);
    const result = await academic_faculty_services?.get_academic_faculties(
      filters,
      pagination_options
    );

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: '',
      data: result,
    });
  }
);

const academic_faculty_by_id = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const result = await academic_faculty_services?.single_academic_faculty(id);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: '',
      data: result,
    });
  }
);

const academic_faculty_update = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const updatedData = req?.body;
    const result = await academic_faculty_services?.update_academic_faculty(
      id,
      updatedData
    );

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty Updated Successfully!',
      data: result,
    });
  }
);

const academic_faculty_delete = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const result = await academic_faculty_services?.delete_academic_faculty(id);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'Academic faculty deleted successfully!',
      data: result,
    });
  }
);

export const academic_faculty_controllers = {
  academic_faculty_create,
  academic_faculties_get,
  academic_faculty_update,
  academic_faculty_by_id,
  academic_faculty_delete,
};
