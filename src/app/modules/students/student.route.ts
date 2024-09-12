import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.get("/all-students", StudentController.getAllStudent);
router.get("/students/:id", StudentController.getSingleStudent);
router.delete("/students/:id", StudentController.deleteStudent);

export const StudentRoute = router;
