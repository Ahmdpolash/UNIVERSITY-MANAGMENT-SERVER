import { Student } from "./student.model";

const getAllStudent = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.deleteOne({ id });
  return result;
};

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
};
