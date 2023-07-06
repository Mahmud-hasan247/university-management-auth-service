import express from 'express';
import userController from './user.controller';
import requestValidate from '../../middlewares/requestValidation';
import { userZodSchema } from './user.zodValidation';

const router = express.Router();

router.post(
  '/create_user',
  requestValidate(userZodSchema),
  userController.userCreate
);

export const userRoutes = router;
