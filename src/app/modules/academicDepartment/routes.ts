import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { academic_department_zod_validation } from './zodValidations';
import { academic_department_controllers } from './controllers';

const router = express.Router();

router.post(
  '/create_academic_department',
  request_validate(academic_department_zod_validation?.create_schema),
  academic_department_controllers?.academic_department_create
);

router.patch(
  '/update_academic_department/:id',
  request_validate(academic_department_zod_validation?.update_schema),
  academic_department_controllers?.academic_department_update
);

router.get(
  '/get_single_academic_department/:id',
  academic_department_controllers?.academic_department_by_id
);

router.delete(
  '/delete_academic_department/:id',
  academic_department_controllers?.academic_department_delete
);

router.get(
  '/get_academic_department',
  academic_department_controllers?.academic_faculties_get
);

export const academic_department_routes = router;
