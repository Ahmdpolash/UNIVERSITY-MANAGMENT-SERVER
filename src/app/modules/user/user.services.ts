import config from "../../../config";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { v4 as uuidv4 } from "uuid";

const CreateStudentIntoDb = async (password: string, studentData: TStudent) => {
  //user object
  const userData: Partial<TUser> = {};

  //if password is not given, then use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "student";

  // set manually generated id
  // userData.id = "546666";

  const generateUniqueId = () => {
    return uuidv4();
  };

  userData.id = generateUniqueId();

  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // referencing id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  CreateStudentIntoDb,
};
