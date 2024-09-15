import config from "../../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.modal";
import { TStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

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

  // set generated id
  userData.id = await generateStudentId(admissionSemester!);

  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // referencing id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  CreateStudentIntoDb,
};
