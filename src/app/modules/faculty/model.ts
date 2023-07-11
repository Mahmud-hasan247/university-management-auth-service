import { Schema, model } from 'mongoose';
import { I_faculty, faculty_model } from './interfaces';
import { blood_groups, genders } from '../student/constants';

export const faculty_schema = new Schema<I_faculty, faculty_model>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
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
    designation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<I_faculty, faculty_model>(
  'Faculty',
  faculty_schema
);
