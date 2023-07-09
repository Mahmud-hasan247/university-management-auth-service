import { z } from 'zod';

const create_schema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    academic_faculty: z.string({
      required_error: 'Academic Faculty is required!',
    }),
  }),
});

const update_schema = z.object({
  body: z.object({
    title: z.string().optional(),
    academic_faculty: z.string().optional(),
  }),
});

export const academic_department_zod_validation = {
  create_schema,
  update_schema,
};
