import { Model } from 'mongoose';

export type IAcademic_faculty = {
  title: string;
};

export type academic_faculty_model = Model<IAcademic_faculty, object>;
