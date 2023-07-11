export type I_gender = 'Male' | 'Female';

export type I_blood_group =
  | 'O+'
  | 'O-'
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-';

export type I_user_name = {
  first_name: string;
  middle_name?: string;
  last_name?: string;
};
