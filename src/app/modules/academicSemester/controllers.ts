import { RequestHandler } from 'express';
import createAcademicSemester from './services';

const academicSemesterCreate: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await createAcademicSemester(academicSemesterData);
    res.status(200).json({
      code: 200,
      message: 'Academic Semester Created Successfully!',
      data: result,
    });
    next();
  } catch (error) {
    next();
  }
};

export default academicSemesterCreate;
