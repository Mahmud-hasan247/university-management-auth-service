import { Schema, model } from 'mongoose';
import { I_student, student_model } from './interface';
import { blood_groups, genders } from '../../../constants/user';

export const student_schema = new Schema<I_student, student_model>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      // required: true,
      first_name: {
        type: String,
        required: true,
      },
      middle_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: genders,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    parents: {
      // required: true,
      father_name: {
        type: String,
        required: true,
      },
      father_occupation: {
        type: String,
      },
      father_contact_no: {
        type: String,
      },
      mother_name: {
        type: String,
        required: true,
      },
      mother_occupation: {
        type: String,
      },
      mother_contact_no: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
    },
    guardian: {
      // required: true,
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
      contact_no: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    contact_no: {
      type: String,
      required: true,
    },
    emergency_contact_no: {
      type: String,
      required: true,
    },
    blood_group: {
      type: String,
      enum: blood_groups,
    },
    email: {
      type: String,
      required: true,
    },
    present_address: {
      type: String,
      required: true,
    },
    permanent_address: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      // required: true,
    },
    academic_department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_department',
    },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_faculty',
    },
    academic_semester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academic_semester',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<I_student, student_model>(
  'Student',
  student_schema
);
