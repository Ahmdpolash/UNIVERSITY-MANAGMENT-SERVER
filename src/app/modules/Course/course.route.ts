import { Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/create-course",
  auth("admin"),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get(
  "/",
  auth("admin", "faculty", "student"),
  CourseController.getAllCourse
);

router.get(
  "/:id",
  auth("admin", "faculty", "student"),
  CourseController.getSingleCourse
);

router.delete("/:id", auth("admin"), CourseController.deleteCourse);

router.patch(
  "/:id",
  auth("admin"),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourseIntoDb
);

router.put(
  "/:courseId/assign-faculties",
  auth("admin"),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth("admin"),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse
);

export const CourseRoutes = router;
