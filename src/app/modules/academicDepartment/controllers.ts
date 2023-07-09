import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academic_department_services } from './services';
import { academic_department_filterable_fields } from './constants';

const academic_department_create = catchAsync(
  async (req: Request, res: Response) => {
    const data = req?.body;
    const result =
      await academic_department_services?.create_academic_department(data);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic department Created Successfully!',
      data: result,
    });
  }
);

const academic_faculties_get = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req?.query, academic_department_filterable_fields);
    const paginationOptions = pick(req?.query, paginationFields);
    const result = await academic_department_services?.get_academic_faculties(
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

const academic_department_by_id = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const result =
      await academic_department_services?.single_academic_department(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: '',
      data: result,
    });
  }
);

const academic_department_update = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const updatedData = req?.body;
    const result =
      await academic_department_services?.update_academic_department(
        id,
        updatedData
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department Updated Successfully!',
      data: result,
    });
  }
);

const academic_department_delete = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const result =
      await academic_department_services?.delete_academic_department(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Department deleted successfully!',
      data: result,
    });
  }
);

export const academic_department_controllers = {
  academic_department_create,
  academic_faculties_get,
  academic_department_update,
  academic_department_by_id,
  academic_department_delete,
};
