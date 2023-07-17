import { z } from 'zod';

const login_schema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refresh_token_schema = z.object({
  cookies: z.object({
    refresh_token: z.string({ required_error: 'Refresh token is required' }),
  }),
});
export const auth_zod_validation = {
  login_schema,
  refresh_token_schema,
};
