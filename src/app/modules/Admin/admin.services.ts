import mongoose from "mongoose";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getAllAdminsFromDb = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDb = async (id: string) => {
  const result = await Admin.findOne({ id });
  return result;
};

const deleteAdminFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Admin");
    }

    //transactin one
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
    }

    await session.commitTransaction();
    await session.endSession();
      



  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete Admin");
  }
};

const updateAdminIntoDb = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllAdminsFromDb,
  getSingleAdminFromDb,
  updateAdminIntoDb,
  deleteAdminFromDb,
};
