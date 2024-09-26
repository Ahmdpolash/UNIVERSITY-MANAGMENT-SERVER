import { Router } from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";

const router = Router();

router.get("/", StudentController.getAllStudent);

router.get("/:id", StudentController.getSingleStudent);

router.patch(
  "/:id",
  validateRequest(studentValidations.updateValidationsSchema),
  StudentController.updateStudent
);

router.delete("/:id", StudentController.deleteStudent);

export const StudentRoute = router;
