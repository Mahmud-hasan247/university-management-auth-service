import { NextFunction, Request, RequestHandler, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { send_response } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { user_services } from './user.services';

const user_create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await user_services.create_user(user);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
    next();
  }
);

export const user_controllers = {
  user_create,
};
