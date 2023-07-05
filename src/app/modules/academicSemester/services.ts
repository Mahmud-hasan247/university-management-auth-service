import { IAcademicSemester } from './interfaces';
import { AcademicSemester } from './models';

const createAcademicSemester = async (academicSemester: IAcademicSemester) => {
  const createdSemester = await AcademicSemester.create(academicSemester);

  if (!createdSemester) {
    throw new Error(
      'Academic Semester is failed to create! please try again...'
    );
  }
  return createdSemester;
};

export default createAcademicSemester;
