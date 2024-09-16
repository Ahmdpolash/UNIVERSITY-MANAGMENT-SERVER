import { Student } from "./student.model";

const getAllStudent = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

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
