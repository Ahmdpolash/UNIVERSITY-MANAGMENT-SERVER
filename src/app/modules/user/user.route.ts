import { UserController } from "./user.controller";

import { studentValidations } from "../students/student.validation";
import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";

const router = Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createValidationsSchema),
  UserController.createStudent
);
router.get("/", UserController.createStudent);

export const UserRoute = router;
