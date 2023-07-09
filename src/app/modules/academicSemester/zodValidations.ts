import { z } from 'zod';
import {
  academic_semester_codes,
  academic_semester_months,
  academic_semester_titles,
} from './constants';

const create_schema = z.object({
  body: z.object({
    title: z.enum([...academic_semester_titles] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.string({
      required_error: 'Year is Required',
    }),
    code: z.enum([...academic_semester_codes] as [string, ...string[]], {
      required_error: 'Code is Required',
    }),
    startMonth: z.enum([...academic_semester_months] as [string, ...string[]], {
      required_error: 'Start month is Required',
    }),
    endMonth: z.enum([...academic_semester_months] as [string, ...string[]], {
      required_error: 'End month is Required',
    }),
  }),
});

const update_schema = z
  .object({
    body: z.object({
      title: z
        .enum([...academic_semester_titles] as [string, ...string[]], {
          required_error: 'Title is Required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),
      code: z
        .enum([...academic_semester_codes] as [string, ...string[]], {
          required_error: 'Code is Required',
        })
        .optional(),
      startMonth: z
        .enum([...academic_semester_months] as [string, ...string[]], {
          required_error: 'Start month is Required',
        })
        .optional(),
      endMonth: z
        .enum([...academic_semester_months] as [string, ...string[]], {
          required_error: 'End month is Required',
        })
        .optional(),
    }),
  })
  .refine(
    data => {
      return (
        (data?.body?.title && data?.body?.code) ||
        (!data?.body?.title && !data?.body?.code)
      );
    },
    {
      message: 'Either both title and code should provided or neither!',
    }
  );

export const academic_semester_zod_validation = {
  create_schema,
  update_schema,
};
