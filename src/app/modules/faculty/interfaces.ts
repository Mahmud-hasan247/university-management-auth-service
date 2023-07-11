import { Model, Types } from 'mongoose';
import { IAcademic_department } from '../academicDepartment/interfaces';
import { IAcademic_faculty } from '../academicFaculty/interfaces';
import { I_blood_group, I_gender, I_user_name } from '../../../interfaces/user';

export type I_faculty = {
  id: string;
  name: I_user_name;
  gender: I_gender;
  date_of_birth: string;
  contact_no: string;
  emergency_contact_no: string;
  blood_group?: I_blood_group;
  email: string;
  present_address: string;
  permanent_address: string;
  profile_image?: string;
  academic_department: Types.ObjectId | IAcademic_department;
  academic_faculty: Types.ObjectId | IAcademic_faculty;
  designation: string;
};

export type faculty_model = Model<I_faculty, Record<string, unknown>>;

export type I_faculty_filters = {
  searchTerm?: string;
  id?: string;
  contact_no?: string;
  blood_group?: I_blood_group;
};
