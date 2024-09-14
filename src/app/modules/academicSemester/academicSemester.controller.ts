import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academicSemester.services";

// Create a new academic semester in the database
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDb(
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Academic Semester created successfully",
    data: result,
  });
});

// Get all academic semesters from the database
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemestersFromDb();

  res.status(200).json({
    success: true,
    message: "All Academic Semesters retrieved successfully",
    data: result,
  });
});

// Get a single academic semester by its ID from the database
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemesterService.getSingleAcademicSemesterFromDb(
    semesterId
  );

  res.status(200).json({
    success: true,
    message: "Academic semester is retrieved succesfully",
    data: result,
  });
});

// update

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemesterService.updateAcademicSemesterFromDb(
    semesterId,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Academic Semester updated successfully",
    data: result,
  });
});



// delete academic semester

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,

};