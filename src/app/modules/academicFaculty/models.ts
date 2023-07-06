import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { IAcademic_faculty, academic_faculty_model } from './interfaces';

const academic_faculty_schema = new Schema<IAcademic_faculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// ________ Checking academic faculty is already exist or not ___________
academic_faculty_schema.pre('save', async function (next) {
  const isExist = await academic_faculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Academic Faculty already exist!');
  }
  next();
});

export const academic_faculty = model<
  IAcademic_faculty | academic_faculty_model
>('academic_faculty', academic_faculty_schema);
