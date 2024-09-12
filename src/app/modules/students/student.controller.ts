import { NextFunction, RequestHandler } from "express";
import { StudentService } from "./student.services";

//get all students
const getAllStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const result = await StudentService.getAllStudent();
    res.status(200).json({
      success: true,
      message: "student retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//get single student
const getSingleStudent: RequestHandler = async (
  req,
  res,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await StudentService.getSingleStudent(id);
    res.status(200).json({
      success: true,
      message: "single student retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete student
const deleteStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await StudentService.deleteStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: "student deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudent,
  deleteStudent,
  getSingleStudent,
};
