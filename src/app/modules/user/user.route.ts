import { UserController } from "./user.controller";

import { studentValidations } from "../students/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";

const router = Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createValidationsSchema),
  UserController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty
);

router.get("/");

export const UserRoute = router;
