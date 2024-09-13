import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.modal";

const createAcademicSemesterIntoDb = (payload: TAcademicSemester) => {
  const result = AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDb,
};
