import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { user_controllers } from './user.controller';
import { user_zod_validation } from './user.zodValidation';

const router = express.Router();

router.post(
  '/create_student',
  request_validate(user_zod_validation?.student_create_schema),
  user_controllers.student_create
);

router.post(
  '/create_faculty',
  request_validate(user_zod_validation?.faculty_create_schema),
  user_controllers.faculty_create
);

export const user_routes = router;
