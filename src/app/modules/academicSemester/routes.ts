import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { academic_semester_controllers } from './controllers';
import { academic_semester_zod_validation } from './zodValidations';

const router = express.Router();

router.post(
  '/create_semester',
  request_validate(academic_semester_zod_validation?.create_schema),
  academic_semester_controllers?.academic_semester_create
);

router.patch(
  '/update_semester/:id',
  request_validate(academic_semester_zod_validation?.update_schema),
  academic_semester_controllers?.semester_update
);

router.get(
  '/get_single_semester/:id',
  academic_semester_controllers?.get_single_semester
);
router.delete(
  '/delete_semester/:id',
  academic_semester_controllers?.semester_delete
);

router.get(
  '/get_semesters',
  academic_semester_controllers?.get_all_academic_semesters
);

export const academic_semester_routes = router;
