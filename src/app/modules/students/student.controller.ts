import { RequestHandler } from "express";
import { StudentService } from "./student.services";
import catchAsync from "../../utils/catchAsync";

//get all students
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudent();
  res.status(200).json({
    success: true,
    message: "student retrived successfully",
    data: result,
  });
});

//get single student
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);
  res.status(200).json({
    success: true,
    message: "single student retrived successfully",
    data: result,
  });
});

// delete student
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: "student deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
};
