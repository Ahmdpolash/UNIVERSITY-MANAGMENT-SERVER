import { NextFunction, RequestHandler } from "express";
import { UserService } from "./user.services";
import { studentValidations } from "../students/student.validation";

const createStudent: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { password, student: StudentData } = req.body;

    // const validate =
    //   studentValidations.createStudentValidationSchema.parse(StudentData);

    const result = await UserService.CreateStudentIntoDb(password, StudentData);

    res.status(200).json({
      success: true,
      message: "student created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
