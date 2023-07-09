import { Model } from 'mongoose';

export type I_academic_semester_titles = 'Autumn' | 'Summer' | 'Fall';
export type I_academic_semester_codes = '01' | '02' | '03';
export type I_academic_semester_months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type I_academic_semester = {
  title: I_academic_semester_titles;
  year: string;
  code: I_academic_semester_codes;
  startMonth: I_academic_semester_months;
  endMonth: I_academic_semester_months;
};

export type academic_semester_model = Model<I_academic_semester, object>;

export type I_academic_semester_filters = { searchTerm?: string };
