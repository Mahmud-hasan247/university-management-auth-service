import { Model, Types } from 'mongoose';
import { IAcademic_department } from '../academicDepartment/interfaces';
import { IAcademic_faculty } from '../academicFaculty/interfaces';
import { I_academic_semester } from '../academicSemester/interfaces';
import { I_blood_group, I_gender, I_user_name } from '../../../interfaces/user';

export type I_parents = {
  father_name: string;
  father_occupation?: string;
  father_contact_no?: string;
  mother_name: string;
  mother_occupation?: string;
  mother_contact_no?: string;
  address: string;
};

export type I_guardian = {
  name: string;
  occupation: string;
  relation: string;
  contact_no: string;
  address: string;
};

export type I_student = {
  id: string;
  name: I_user_name;
  gender: I_gender;
  date_of_birth: string;
  parents: I_parents;
  guardian: I_guardian;
  contact_no: string;
  emergency_contact_no: string;
  blood_group?: I_blood_group;
  email: string;
  present_address: string;
  permanent_address: string;
  profile_image?: string;
  academic_department: Types.ObjectId | IAcademic_department;
  academic_faculty: Types.ObjectId | IAcademic_faculty;
  academic_semester: Types.ObjectId | I_academic_semester;
};

export type student_model = Model<I_student, Record<string, unknown>>;

export type I_student_filters = {
  searchTerm?: string;
  id?: string;
  contact_no?: string;
  blood_group?: I_blood_group;
};
