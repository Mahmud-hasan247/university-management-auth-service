/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { academicSemesterServices } from './services';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './interfaces';
import { academicSemesterFilterableFields } from './constants';

const academicSemesterCreate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterServices?.createAcademicSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
  }
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req?.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req?.query, paginationFields);

    const result = await academicSemesterServices?.getAcademicSemesters(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: '',
      meta: result?.meta,
      data: result?.data,
    });
  }
);

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await academicSemesterServices?.getSingleSemesterById(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: '',
    data: result,
  });
});

const semesterUpdate = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req?.body;
  const result = await academicSemesterServices?.updateSemester(id, data);

  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester Updated Successfully!',
    data: result,
  });
});

const semesterDelete = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await academicSemesterServices?.deleteSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester Deleted Successfully!',
    data: result,
  });
});

export const academicSemesterControllers = {
  academicSemesterCreate,
  getAllAcademicSemesters,
  getSingleSemester,
  semesterUpdate,
  semesterDelete,
};
