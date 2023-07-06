import express from 'express';
import requestValidate from '../../middlewares/requestValidation';
import academicSemesterZodSchema from './zodValidations';
import academicSemesterCreate from './controllers';

const router = express.Router();

router.post(
  '/create_semester',
  requestValidate(academicSemesterZodSchema),
  academicSemesterCreate
);

export const academicSemesterRoutes = router;
