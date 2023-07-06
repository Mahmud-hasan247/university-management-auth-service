import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import createAcademicSemester from './services';
import { sendResponse } from '../../../shared/sendResponse';

const academicSemesterCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemester(academicSemesterData);
    next();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
  }
);

export default academicSemesterCreate;
