import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.services";

// get all faculties
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDb();

  res.status(200).json({
    success: true,
    message: "All Faculty retrieved successfully",
    data: result,
  });
});

// get single faculty

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);

  res.status(200).json({
    success: true,
    message: "Single Faculty retrieved successfully",
    data: result,
  });
});

//update

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDb(id, faculty);

  res.status(200).json({
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

//delete faculty
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacultyServices.deleteFacultyFromDb(id);

  res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
