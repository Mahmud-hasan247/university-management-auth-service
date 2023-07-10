import express from 'express';
import { student_controllers } from './controllers';
import { student_zod_validation } from './zodValidations';
import request_validate from '../../middlewares/requestValidation';

const router = express.Router();

router.patch(
  '/update_student/:id',
  request_validate(student_zod_validation?.update_schema),
  student_controllers?.student_update
);

router.get('/get_single_student/:id', student_controllers?.get_single_student);
router.delete('/delete_student/:id', student_controllers?.student_delete);

router.get('/get_students', student_controllers?.get_all_students);

export const student_routes = router;
