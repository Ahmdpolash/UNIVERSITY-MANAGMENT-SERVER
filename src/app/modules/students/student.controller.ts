import { RequestHandler } from "express";
import { StudentService } from "./student.services";
import catchAsync from "../../utils/catchAsync";

//get all students
const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudent(req.query);
  console.log(result);
  res.status(200).json({
    success: true,
    message: "student retrived successfully",
    data: result,
  });
});

//get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);
  res.status(200).json({
    success: true,
    message: "single student retrived successfully",
    data: result,
  });
});

// delete student
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await StudentService.deleteStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: "student deleted successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;

  const result = await StudentService.updateStudentIntoDB(id, student);

  res.status(200).json({
    success: true,
    message: "student updated successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
  updateStudent,
};
