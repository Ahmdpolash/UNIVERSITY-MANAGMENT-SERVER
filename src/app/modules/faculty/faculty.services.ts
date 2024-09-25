import { startSession } from "mongoose";

import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";

const getAllFacultiesFromDb = async () => {
  const result = await Faculty.find();
  return result;
};

//single
const getSingleFacultyFromDb = async (id: string) => {
  // const result = await Faculty.findById(id);
  const result = await Faculty.findOne({ id }).populate("academicDepartment");

  return result;
};

//update
const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, academicDepartment, ...remainingFacultyData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (academicDepartment && Object.keys(academicDepartment).length) {
    for (const [key, value] of Object.entries(academicDepartment)) {
      modifiedData[`academicDepartment.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete

const deleteFacultyFromDb = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();
    //delete faculty (transaction - one )
    const deleteFaculty = await Faculty.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Faculty");
    }

    //delete user (transaction - two )

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete faculty");
  }
};

export const FacultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateFacultyIntoDb,
  deleteFacultyFromDb,
};
