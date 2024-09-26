import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

//create
const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

//get all courses
const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .sort()
    .paginate()
    .fields()
    .filter();

  const result = await courseQuery.modelQuery;
  return result;
};

//get single course by id
const getSingleCoursesFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

// delete single course
const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//update course

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  //step1: basic course info update (title,code,prefix,credits)

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedBasicCourseInfo;
};

export const CourseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCoursesFromDb,
  deleteCourseFromDb,
  updateCourseIntoDb,
};
