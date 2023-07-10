import { z } from 'zod';
import { blood_groups, genders } from './constants';

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
      parents: z
        .object({
          father_name: z.string().optional(),
          father_occupation: z.string().optional(),
          father_contact_no: z.string().optional(),
          mother_name: z.string().optional(),
          mother_occupation: z.string().optional(),
          mother_contact_no: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
      guardian: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          relation: z.string().optional(),
          contact_no: z.string().optional(),
          address: z.string().optional(),
        })
        .optional(),
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
      academic_semester: z.string().optional(),
    })
    .optional(),
});

export const student_zod_validation = {
  update_schema,
};
