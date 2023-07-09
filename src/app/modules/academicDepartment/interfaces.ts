import { IAcademic_faculty } from './../academicFaculty/interfaces';
import { Model, Types } from 'mongoose';

export type IAcademic_department = {
  title: string;
  academic_faculty: Types.ObjectId | IAcademic_faculty;
};

export type academic_department_model = Model<IAcademic_department, object>;

export type IAcademic_department_filters = {
  searchTerm?: string;
  academic_faculty: Types.ObjectId;
};
