import { z } from "zod";

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Local Guardians Schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
const createValidationsSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emerGencyContactNumber: z.string(),
      bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permenentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,

      profileImage: z.string(),
      admissionSemester: z.string(),
      // academicDepartment: z.string(),
    }),
  }),
});

//update

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Local Guardians Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student Schema
const updateValidationsSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emerGencyContactNumber: z.string(),
      bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permenentAddress: z.string(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,

      profileImage: z.string(),
      admissionSemester: z.string(),
      // academicDepartment: z.string(),
    }),
  }),
});

export const studentValidations = {
  createValidationsSchema,
  updateValidationsSchema,
};
