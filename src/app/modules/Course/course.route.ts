import { Router } from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";

const router = Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse
);

router.get("/", CourseController.getAllCourse);

router.get("/:id", CourseController.getSingleCourse);

router.delete("/:id", CourseController.deleteCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourseIntoDb
);

export const CourseRoutes = router;
