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

router.get("/", AcademicSemesterController.getAllAcademicSemesters);
router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);
router.patch(
  "/:semesterId",
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidation),
  AcademicSemesterController.updateAcademicSemester
);

export const AcademicSemesterRoute = router;
