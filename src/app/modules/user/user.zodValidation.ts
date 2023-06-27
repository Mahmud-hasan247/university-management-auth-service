import { z } from 'zod';

const UserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required!',
    }),
    password: z.string().optional(),
  }),
});

export default UserZodSchema;
