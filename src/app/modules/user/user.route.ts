import { UserController } from "./user.controller";

import { studentValidations } from "../students/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

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

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin
);

router.get("/", UserController.getAllUser);

export const UserRoute = router;
