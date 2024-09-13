import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoute = router;
