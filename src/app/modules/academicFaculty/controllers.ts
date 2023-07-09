import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academic_faculty_services } from './services';
import { academic_faculty_filterable_fields } from './constants';

const academic_faculty_create = catchAsync(
  async (req: Request, res: Response) => {
    const data = req?.body;
    const result = await academic_faculty_services?.create_academic_faculty(
      data
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty Created Successfully!',
      data: result,
    });
  }
);

const academic_faculties_get = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req?.query, academic_faculty_filterable_fields);
    const paginationOptions = pick(req?.query, paginationFields);
    const result = await academic_faculty_services?.get_academic_faculties(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
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

    sendResponse(res, {
      statusCode: StatusCodes.OK,
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

    sendResponse(res, {
      statusCode: StatusCodes.OK,
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

    sendResponse(res, {
      statusCode: StatusCodes.OK,
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
