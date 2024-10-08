import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { User } from "../user/user.model";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  //   const isUserExists = await User.findOne({ id: payload?.id });  // this is also how we check it

  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not found");
  }

  //checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked !!");
  }

  //checking if the password is correct
  // const isPasswordMatch = await bcrypt.compare(
  //   payload?.password,
  //   isUserExists?.password
  // );

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not matched");
  }

  return {};
};

export const AuthServices = {
  loginUser,
};
