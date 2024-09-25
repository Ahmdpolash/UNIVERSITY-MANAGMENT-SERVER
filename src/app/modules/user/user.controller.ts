import { UserService } from "./user.services";

import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
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

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: FacultyData } = req.body;

  const result = await UserService.CreateFacultyIntoDb(password, FacultyData);
  res.status(200).json({
    success: true,
    message: "faculty created successfully",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsersFromDb();

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  getAllUser,
};
