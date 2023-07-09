import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/routes';
import { academic_faculty_routes } from '../modules/academicFaculty/routes';
import { academic_department_routes } from '../modules/academicDepartment/routes';

const router = express.Router();

const moduleRoutes = [
  { path: 'users', route: userRoutes },
  { path: 'academic_semester', route: academicSemesterRoutes },
  { path: 'academic_faculty', route: academic_faculty_routes },
  { path: 'academic_department', route: academic_department_routes },
];

moduleRoutes.forEach(route =>
  router.use(`/api/v1/${route?.path}`, route?.route)
);

export default router;
