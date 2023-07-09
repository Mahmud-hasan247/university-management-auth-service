import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { IAcademic_department, academic_department_model } from './interfaces';

const academic_department_schema = new Schema<IAcademic_department>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academic_faculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic_faculty',
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

// ________ Checking academic department is already exist or not ___________
academic_department_schema.pre('save', async function (next) {
  const isExist = await academic_department.findOne({
    title: this.title,
    id: this?.id,
  });
  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic department already exist!'
    );
  }
  next();
});

export const academic_department = model<
  IAcademic_department | academic_department_model
>('academic_department', academic_department_schema);
