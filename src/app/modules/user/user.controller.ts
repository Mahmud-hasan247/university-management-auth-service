import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { send_response } from '../../../shared/sendResponse';
import { user_services } from './user.services';

const student_create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await user_services.create_student(student, userData);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
  }
);

const faculty_create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await user_services.create_faculty(faculty, userData);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
  }
);

export const user_controllers = {
  student_create,
  faculty_create,
};
