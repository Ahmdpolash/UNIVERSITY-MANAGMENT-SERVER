import { RequestHandler } from "express";
import { UserService } from "./user.services";
import { studentValidations } from "../students/student.validation";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: StudentData } = req.body;

  // const validate =
  //   studentValidations.createStudentValidationSchema.parse(StudentData);

  const result = await UserService.CreateStudentIntoDb(password, StudentData);

  res.status(200).json({
    success: true,
    message: "student created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
