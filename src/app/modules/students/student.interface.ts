import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  motherName: string;
  contactNumber: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth: Date;
  contactNumber: string;
  emerGencyContactNumber: string;
  email: string;
  bloodStatus?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress?: string;
  permenentAddress?: string;
  guardian: TGuardian;
  localGuardian?: TLocalGuardian;
  profileImage?: string;
 
};
