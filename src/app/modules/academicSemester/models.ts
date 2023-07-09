import { Schema, model } from 'mongoose';
import { I_academic_semester, academic_semester_model } from './interfaces';
import {
  academic_semester_codes,
  academic_semester_months,
  academic_semester_titles,
} from './constants';
import Api_Error from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const academic_semester_schema = new Schema<I_academic_semester>(
  {
    title: {
      type: String,
      required: true,
      enum: academic_semester_titles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academic_semester_codes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academic_semester_months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academic_semester_months,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academic_semester_schema.pre('save', async function (next) {
  const is_exist = await academic_semester.findOne({
    title: this.title,
    year: this.year,
  });
  if (is_exist) {
    throw new Api_Error(
      StatusCodes.CONFLICT,
      'Academic Semester is already exist!'
    );
  }
  next();
});

export const academic_semester = model<
  I_academic_semester,
  academic_semester_model
>('academic_semester', academic_semester_schema);
