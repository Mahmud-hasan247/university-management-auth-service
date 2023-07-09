import { z } from 'zod';

const create_schema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
  }),
});

const update_schema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
  }),
});

export const academic_faculty_zod_validation = {
  create_schema,
  update_schema,
};
