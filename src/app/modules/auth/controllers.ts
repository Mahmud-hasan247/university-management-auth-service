import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import { send_response } from '../../../shared/sendResponse';
import { auth_services } from './services';

const user_login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const auth_data = req?.body;

    const result = await auth_services.login_user(auth_data);
    const { refresh_token, ...others } = result;

    const cookie_options = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refresh_token', refresh_token, cookie_options);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'User Logged in Successfully!',
      data: others,
    });
  }
);

const refresh_token: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refresh_token } = req.cookies;

    const result = await auth_services.refresh_token(refresh_token);

    const cookie_options = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refresh_token', refresh_token, cookie_options);

    send_response(res, {
      status_code: StatusCodes.OK,
      success: true,
      message: 'User Logged in Successfully!',
      data: result,
    });
  }
);

export const auth_controllers = {
  user_login,
  refresh_token,
};
