import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { user_controllers } from './user.controller';
import { user_zod_validation } from './user.zodValidation';

const router = express.Router();

router.post(
  '/create_student',
  request_validate(user_zod_validation?.create_schema),
  user_controllers.student_create
);

export const user_routes = router;
