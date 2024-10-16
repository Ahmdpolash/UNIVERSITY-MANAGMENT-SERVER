import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";
import { EnrolledCourseControllers } from "./enrolledCourse.controller";

const router = express.Router();

router.post(
  "/create-enrolled-course",

  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  EnrolledCourseControllers.createEnrolledCourse
);

// router.patch(
//   "/update-enrolled-course-marks",
//   auth("faculty"),
//   validateRequest(
//     EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
//   ),
//   EnrolledCourseControllers.updateEnrolledCourseMarks
// );

export const EnrolledCourseRoutes = router;
