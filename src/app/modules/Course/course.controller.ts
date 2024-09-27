import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.services";

//create a new course

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  res.status(200).json({
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

// get all courses
const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDb(req.query);

  res.status(200).json({
    success: true,
    message: "Course retrived successfully",
    data: result,
  });
});

//get single course

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCoursesFromDb(id);

  res.status(200).json({
    success: true,
    message: "Single Course retrived successfully",
    data: result,
  });
});

//delete single course

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDb(id);

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

// update course

const updateCourseIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.updateCourseIntoDb(id, req.body);

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

//assign faculties
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties
  );

  res.status(200).json({
    success: true,
    message: "Faculties assigned successfully",
    data: result,
  });
});

// delete faculties
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDb(
    courseId,
    faculties
  );

  res.status(200).json({
    success: true,
    message: "Faculties removed  succesfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourse,
  deleteCourse,
  updateCourseIntoDb,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
