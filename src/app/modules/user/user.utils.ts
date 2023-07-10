import { I_academic_semester } from '../academicSemester/interfaces';
import { User } from './user.model';

const last_student_id = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser?.id?.substring(4) : undefined;
};

export const generate_student_Id = async (
  academic_semester: I_academic_semester | null
) => {
  const currentId =
    (await last_student_id()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academic_semester?.year.substring(2)}${
    academic_semester?.code
  }${incrementedId}`;

  return incrementedId;
};

const last_faculty_id = async (): Promise<string | undefined> => {
  const last_faculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return last_faculty?.id ? last_faculty?.id?.substring(2) : undefined;
};

export const generate_faculty_id = async (): Promise<string> => {
  const current_id =
    (await last_faculty_id()) || (0).toString().padStart(5, '0');
  let incremented_id = (parseInt(current_id) + 1).toString().padStart(5, '0');

  incremented_id = `F-${incremented_id}`;

  return incremented_id;
};
