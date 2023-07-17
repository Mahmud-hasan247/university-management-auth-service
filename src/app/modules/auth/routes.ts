import express from 'express';
import request_validate from '../../middlewares/requestValidation';
import { auth_zod_validation } from './zodValidations';
import { auth_controllers } from './controllers';

const router = express.Router();

router.post(
  '/login',
  request_validate(auth_zod_validation?.login_schema),
  auth_controllers.user_login
);

router.post(
  '/refresh_token',
  request_validate(auth_zod_validation?.refresh_token_schema),
  auth_controllers.refresh_token
);

export const auth_routes = router;
