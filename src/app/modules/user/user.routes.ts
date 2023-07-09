import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { user_zod_validation } from './user.zodValidation';
import { user_controllers } from './user.controller';

const router = express.Router();

router.post(
  '/create_user',
  request_validate(user_zod_validation?.create_schema),
  user_controllers.user_create
);

export const user_routes = router;
