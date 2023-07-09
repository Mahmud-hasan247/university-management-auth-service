import express from 'express';
import { user_routes } from '../modules/user/user.routes';
import { academic_semester_routes } from '../modules/academicSemester/routes';
import { academic_faculty_routes } from '../modules/academicFaculty/routes';
import { academic_department_routes } from '../modules/academicDepartment/routes';

const router = express.Router();

const module_routes = [
  { path: 'users', route: user_routes },
  { path: 'academic_semester', route: academic_semester_routes },
  { path: 'academic_faculty', route: academic_faculty_routes },
  { path: 'academic_department', route: academic_department_routes },
];

module_routes.forEach(route =>
  router.use(`/api/v1/${route?.path}`, route?.route)
);

export default router;
