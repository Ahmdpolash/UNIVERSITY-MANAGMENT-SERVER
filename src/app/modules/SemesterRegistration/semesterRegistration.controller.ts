import catchAsync from "../../utils/catchAsync";

import { SemesterRegistrationService } from "./semesterRegistration.services";

// create new semester
const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body
    );

  res.status(200).json({
    success: true,
    message: "Semester registration created successfully",
    data: result,
  });
});

// get all semesters
const getAllSemesterRegistrations = catchAsync(async (req, res) => {});

// get single registered semester by id  (using id from url parameter)
const getSingleSemesterRegistration = catchAsync(async (req, res) => {});

// update registered semester
const updateSemesterRegistration = catchAsync(async (req, res) => {});

// delete registered semester
const deleteSemesterRegistration = catchAsync(async (req, res) => {});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
