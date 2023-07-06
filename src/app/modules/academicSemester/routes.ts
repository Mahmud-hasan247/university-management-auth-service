import express from 'express';
import requestValidate from '../../middlewares/requestValidation';
import { academicSemesterControllers } from './controllers';
import { zodSchemas } from './zodValidations';

const router = express.Router();

router.post(
  '/create_semester',
  requestValidate(zodSchemas?.academicSemesterCreateZodSchema),
  academicSemesterControllers?.academicSemesterCreate
);

router.patch(
  '/update_semester/:id',
  requestValidate(zodSchemas?.academicSemesterUpdateZodSchema),
  academicSemesterControllers?.semesterUpdate
);

router.get(
  '/get_single_semester/:id',
  academicSemesterControllers?.getSingleSemester
);
router.delete(
  '/delete_semester/:id',
  academicSemesterControllers?.semesterDelete
);

router.get(
  '/get_semesters',
  academicSemesterControllers?.getAllAcademicSemesters
);

export const academicSemesterRoutes = router;
