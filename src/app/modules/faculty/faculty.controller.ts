import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.services";

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDb();

  res.status(200).json({
    success: true,
    message: "All Faculty retrieved successfully",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await FacultyServices.getSingleFacultyFromDb(facultyId);
  console.log(result);

  res.status(200).json({
    success: true,
    message: "Single Faculty retrieved successfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
};
