import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.modal";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

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
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error("Failed to create student");
  }
};

export const UserService = {
  CreateStudentIntoDb,
};
