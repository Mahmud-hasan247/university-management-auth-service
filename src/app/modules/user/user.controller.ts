import { NextFunction, Request, RequestHandler, Response } from 'express';
import userServices from './user.services';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';

const userCreate: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userServices.createUser(user);

    next();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User Created Successfully!',
      data: result,
    });
  }
);

export default {
  userCreate,
};
