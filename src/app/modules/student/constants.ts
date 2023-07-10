import { I_blood_group, I_gender } from './interface';

export const genders: I_gender[] = ['Male', 'Female'];

export const blood_groups: I_blood_group[] = [
  'O+',
  'O-',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
];

export const student_searchable_fields = [
  'id',
  'contact_no',
  'name.first_name',
  'name.middle_name',
  'name.last_name',
];

export const student_filterable_fields = [
  'searchTerm',
  'id',
  'contact_no',
  'blood_group',
];
