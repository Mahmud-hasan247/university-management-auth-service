import { z } from 'zod';
import { blood_groups, genders } from '../student/constants';

const student_create_schema = z.object({
  body: z.object({
    student: z.object({
      id: z.string({ required_error: 'Id is required' }),
      password: z.string().optional(),
      name: z.object({
        first_name: z.string({
          required_error: 'First Name is Required',
        }),
        middle_name: z.string().optional(),
        last_name: z.string().optional(),
      }),
      gender: z.enum([...genders] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      date_of_birth: z.string({ required_error: 'Date of Birth is required' }),
      parents: z.object({
        father_name: z.string({
          required_error: 'Father Name is Required',
        }),
        father_occupation: z.string().optional(),
        father_contact_no: z.string().optional(),
        mother_name: z.string({
          required_error: 'Mother Name is Required',
        }),
        mother_occupation: z.string().optional(),
        mother_contact_no: z.string().optional(),
        address: z.string({ required_error: 'Address is required' }),
      }),
      guardian: z.object({
        name: z.string({
          required_error: 'Guardian Name is Required',
        }),

        occupation: z.string({
          required_error: 'Guardian occupation is Required',
        }),

        relation: z.string({ required_error: 'Relation is required' }),
        contact_no: z.string({ required_error: 'Contact No is required' }),
        address: z.string({ required_error: 'Address is required' }),
      }),

      contact_no: z.string({ required_error: 'Contact No is required' }),
      emergency_contact_no: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      blood_group: z
        .enum([...blood_groups] as [string, ...string[]])
        .optional(),
      email: z.string({ required_error: 'Email is required' }).email(),
      present_address: z.string({
        required_error: 'Present address is required',
      }),
      permanent_address: z.string({
        required_error: 'Permanent address is required',
      }),
      profile_image: z.string().optional(),
      academic_department: z.string({
        required_error: 'Academic department is required',
      }),
      academic_faculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academic_semester: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

// _id: ObjectID;
// id: string;
// name: firstName;
// middleName(optional);
// lastName;
// dateOfBirth;
// email;
// contactNo;
// emergencyContactNo;
// gender;
// permanentAddress;
// presentAddress;
// bloodGroup(optional);
// designation;
// academicDepartment(reference);
// academicFaculty(reference);
// profileImage(optional);

const faculty_create_schema = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string({ required_error: 'Id is required' }),
      password: z.string().optional(),
      name: z.object({
        first_name: z.string({
          required_error: 'First Name is Required',
        }),
        middle_name: z.string().optional(),
        last_name: z.string().optional(),
      }),
      gender: z.enum([...genders] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      date_of_birth: z.string({ required_error: 'Date of Birth is required' }),

      contact_no: z.string({ required_error: 'Contact No is required' }),
      emergency_contact_no: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      blood_group: z
        .enum([...blood_groups] as [string, ...string[]])
        .optional(),
      email: z.string({ required_error: 'Email is required' }).email(),
      present_address: z.string({
        required_error: 'Present address is required',
      }),
      permanent_address: z.string({
        required_error: 'Permanent address is required',
      }),
      profile_image: z.string().optional(),
      academic_department: z.string({
        required_error: 'Academic department is required',
      }),
      academic_faculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

export const user_zod_validation = {
  student_create_schema,
  faculty_create_schema,
};
