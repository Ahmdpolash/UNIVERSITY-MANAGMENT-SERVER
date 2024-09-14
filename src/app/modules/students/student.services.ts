import { Student } from "./student.model";

const getAllStudent = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id);
  // const result = await Student.aggregate([{ $match: { _id : id } }]);
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.deleteOne({ id }, { isDeleted: true });
  return result;
};




export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudentFromDb,
};
