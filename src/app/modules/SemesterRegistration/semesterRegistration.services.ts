import httpStatus from "http-status";
import { AcademicSemester } from "../academicSemester/academicSemester.modal";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import AppError from "../../errors/AppError";

// register a new semester
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload?.academicSemester;

  // check if the semester is already exist
  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );

  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic semester not found");
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

//get all registered semester
const getAllSemesterRegistrationsFromDB = async () => {};

//get single semester registration
const getSingleSemesterRegistrationsFromDB = async () => {};

// update semester registration
const updateSemesterRegistrationIntoDB = async () => {};

// delete semester registration
const deleteSemesterRegistrationFromDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
