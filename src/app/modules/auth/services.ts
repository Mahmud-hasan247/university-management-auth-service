import { StatusCodes } from 'http-status-codes';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import Api_Error from '../../../errors/ApiError';
import { generate_token, verify_token } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { I_refresh_token_response, I_user_login } from './interfaces';

const login_user = async (payload: I_user_login) => {
  const { id, password } = payload;

  //   check user existence

  const user = new User();

  const is_user_exist = await user.user_exist(id);

  if (!is_user_exist) {
    throw new Api_Error(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  const {
    id: userId,
    role,
    needs_password_change,
    password: user_password,
  } = is_user_exist;
  //   checking password matching

  const matched_pass =
    is_user_exist?.password &&
    user?.password_matched(password, user_password as string);

  if (!matched_pass) {
    throw new Api_Error(StatusCodes.UNAUTHORIZED, 'Password is incorrect');
  }

  const {
    jwt: {
      access_secret,
      access_expires_in,
      refresh_secret,
      refresh_expires_in,
    },
  } = config;

  //   create access token
  const access_token = generate_token(
    { userId, role },
    access_secret as Secret,
    access_expires_in as string
  );

  // create refresh token
  const refresh_token = generate_token(
    { userId, role },
    refresh_secret as Secret,
    refresh_expires_in as string
  );

  return {
    access_token,
    refresh_token,
    needs_password_change,
  };
};

const refresh_token = async (
  token: string
): Promise<I_refresh_token_response> => {
  let verified_token = null;
  try {
    verified_token = verify_token(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new Api_Error(StatusCodes.FORBIDDEN, 'Invalid refresh token');
  }

  const user_id = verified_token.userId;

  const user = new User();

  const is_user_exist = await user.user_exist(user_id);

  if (!is_user_exist) {
    throw new Api_Error(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  const { id: userId, role } = is_user_exist;

  // create new access token
  const new_access_token = generate_token(
    { userId, role },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string
  );

  return {
    access_token: new_access_token,
  };
};

export const auth_services = {
  login_user,
  refresh_token,
};
