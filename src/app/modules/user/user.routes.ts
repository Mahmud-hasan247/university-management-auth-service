import express from 'express';
import userController from './user.controller';
import UserZodSchema from './user.zodValidation';
import requestValidate from '../../middlewares/requestValidation';

const router = express.Router();

router.post(
  '/create_user',
  requestValidate(UserZodSchema),
  userController.userCreate
);

export default router;
