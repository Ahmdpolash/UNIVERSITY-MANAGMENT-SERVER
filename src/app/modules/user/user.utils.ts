import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

//year semester 4 digits number

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();

  let lastStudentId = await findLastStudentId();
  let lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  let lastStudentSemesterYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6); //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

//faculty

const findLastFacultyId = async () => {
  const result = await User.findOne(
    {
      role: " faculty",
    },

    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return result?.id ? result.id : undefined;
};

export const generatedFacultyId = async () => {
  let currentId = (0).toString();

  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  incrementId = `F-${incrementId}`;

  return incrementId;
};
