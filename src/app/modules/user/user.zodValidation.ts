import { z } from 'zod';

export const create_schema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required...',
    }),
    password: z.string().optional(),
  }),
});

export const user_zod_validation = {
  create_schema,
};
