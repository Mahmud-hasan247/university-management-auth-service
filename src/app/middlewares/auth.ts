import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { verify_token } from './../../helpers/jwtHelpers';
import { NextFunction, Request, Response } from 'express';
import Api_Error from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

export const auth =
  (...user_roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new Api_Error(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
      }

      const verified_user = verify_token(
        token as string,
        config.jwt.access_secret as Secret
      );
      if (!verified_user) {
        throw new Api_Error(StatusCodes.UNAUTHORIZED, 'Invalid token');
      }

      req.user = verified_user;

      if (user_roles?.length && !user_roles.includes(verified_user?.role)) {
        throw new Api_Error(StatusCodes.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
