import {
  I_academic_semester_codes,
  I_academic_semester_months,
  I_academic_semester_titles,
} from './interfaces';

export const academic_semester_titles: I_academic_semester_titles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academic_semester_codes: I_academic_semester_codes[] = [
  '01',
  '02',
  '03',
];

export const academic_semester_months: I_academic_semester_months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academic_semester_title_code_mapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academic_semester_searchable_fields = ['title', 'code', 'year'];

export const academic_semester_filterable_fields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
