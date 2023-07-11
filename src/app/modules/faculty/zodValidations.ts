import { z } from 'zod';
import { blood_groups, genders } from '../../../constants/user';

const update_schema = z.object({
  body: z
    .object({
      name: z
        .object({
          first_name: z.string().optional(),
          middle_name: z.string().optional(),
          last_name: z.string().optional(),
        })
        .optional(),
      gender: z.enum([...genders] as [string, ...string[]]).optional(),
      date_of_birth: z.string().optional(),
      contact_no: z.string().optional(),
      emergency_contact_no: z.string().optional(),
      blood_group: z
        .enum([...blood_groups] as [string, ...string[]])
        .optional(),
      email: z.string().email().optional(),
      present_address: z.string().optional(),
      permanent_address: z.string().optional(),
      profile_image: z.string().optional(),
      academic_department: z.string().optional(),
      academic_faculty: z.string().optional(),
      designation: z.string().optional(),
    })
    .optional(),
});

export const faculty_zod_validation = {
  update_schema,
};
