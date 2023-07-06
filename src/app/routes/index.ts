import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/routes';

const router = express.Router();

const moduleRoutes = [
  { path: 'users', route: userRoutes },
  { path: 'academic_semester', route: academicSemesterRoutes },
  { path: 'academic_faculty', route: academicFacultyRoutes },
];

moduleRoutes.forEach(route =>
  router.use(`/api/v1/${route?.path}`, route?.route)
);

export default router;
