import catchAsync from "../../utils/catchAsync";


// create new semester
const createSemesterRegistration = catchAsync(async (req, res) => { });


// get all semesters
const getAllSemesterRegistrations = catchAsync(async (req, res) => { });


// get single registered semester by id  (using id from url parameter)  
const getSingleSemesterRegistration = catchAsync(async (req, res) => { });


// update registered semester
const updateSemesterRegistration = catchAsync(async (req, res) => { });


// delete registered semester
const deleteSemesterRegistration = catchAsync(async (req, res) => {});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
