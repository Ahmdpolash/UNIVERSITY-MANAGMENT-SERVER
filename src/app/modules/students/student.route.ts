import { Router } from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";

const router = Router();

router.get("/", StudentController.getAllStudent);

router.get("/:studentId", StudentController.getSingleStudent);

router.patch(
  "/:studentId",
  validateRequest(studentValidations.updateValidationsSchema),
  StudentController.updateStudent
);

router.delete("/:studentId", StudentController.deleteStudent);

export const StudentRoute = router;
