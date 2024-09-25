import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.modal";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TFaculty } from "../faculty/faculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../faculty/faculty.model";

const CreateStudentIntoDb = async (password: string, payload: TStudent) => {
  //user object
  const userData: Partial<TUser> = {};

  //if password is not given, then use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  //find admission semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generateStudentId(admissionSemester!);

    //create a user (transaction - 1)
    const newUser = await User.create([userData], { session }); //array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    //create a student

    //set id ,_id as student
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // referencing id

    //create a student (transaction - 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

//create new faculty (user)

const CreateFacultyIntoDb = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid academic department");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set generated id
    userData.id = await generatedFacultyId();

    //create a new user (faculty)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    //set id ,_id as faculty

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // referencing id

    //create a new user (faculty) transaction - 2

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const getAllUsersFromDb = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  CreateStudentIntoDb,
  CreateFacultyIntoDb,
  getAllUsersFromDb,
};
