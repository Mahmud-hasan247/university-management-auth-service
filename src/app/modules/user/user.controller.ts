import { NextFunction, Request, RequestHandler, Response } from 'express';
import userServices from './user.services';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const userCreate: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userServices.createUser(user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
    next();
  }
);

export default {
  userCreate,
};
