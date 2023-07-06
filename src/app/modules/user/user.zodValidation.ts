// import { z } from 'zod';

// const UserZodSchema = z.object({
//   body: z.object({
//     role: z.string({
//       required_error: 'Role is required!',
//     }),
//     password: z.string().optional(),
//   }),
// });

// export default UserZodSchema;

import { z } from 'zod';

export const userZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required...',
    }),
    password: z.string().optional(),
  }),
});
