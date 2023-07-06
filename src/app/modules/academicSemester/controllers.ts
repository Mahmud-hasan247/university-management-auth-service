import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import createAcademicSemester from './services';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const academicSemesterCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemester(academicSemesterData);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
    next();
  }
);

export default academicSemesterCreate;
