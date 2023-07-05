import express from 'express';
import requestValidate from '../../middlewares/requestValidation';
import academicSemesterZodSchema from './zodValidations';
import academicSemesterCreate from './controllers';

const academicSemesterRoute = express.Router();

academicSemesterRoute.post(
  '/create_semester',
  requestValidate(academicSemesterZodSchema),
  academicSemesterCreate
);

export default academicSemesterRoute;
