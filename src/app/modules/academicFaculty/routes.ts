import express from 'express';
import { academic_faculty_controllers } from './controllers';
import { academic_faculty_zod_validation } from './zodValidations';
import requestValidate from '../../middlewares/requestValidation';

const router = express.Router();

router.post(
  '/create_academic_faculty',
  requestValidate(academic_faculty_zod_validation?.create_schema),
  academic_faculty_controllers?.academic_faculty_create
);

router.patch(
  '/update_academic_faculty/:id',
  academic_faculty_controllers?.academic_faculty_update
);

router.get(
  '/academic_faculty_by_id/:id',
  academic_faculty_controllers?.academic_faculty_by_id
);

router.delete(
  '/delete_academic_faculty/:id',
  academic_faculty_controllers?.academic_faculty_delete
);

router.get(
  '/get_academic_faculty',
  academic_faculty_controllers?.academic_faculties_get
);

export const academicFacultyRoutes = router;
