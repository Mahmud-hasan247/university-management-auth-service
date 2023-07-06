import express from 'express';
import requestValidate from '../../middlewares/requestValidation';
import academicSemesterZodSchema from './zodValidations';
import { academicSemesterControllers } from './controllers';

const router = express.Router();

router.post(
  '/create_semester',
  requestValidate(academicSemesterZodSchema),
  academicSemesterControllers?.academicSemesterCreate
);

router.get(
  '/get_single_semester/:id',
  academicSemesterControllers?.getSingleSemester
);

router.get(
  '/get_semesters',
  academicSemesterControllers?.getAllAcademicSemesters
);

export const academicSemesterRoutes = router;
