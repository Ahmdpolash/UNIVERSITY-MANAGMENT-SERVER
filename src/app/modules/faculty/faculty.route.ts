import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = Router();

router.get("/", FacultyControllers.getAllFaculties);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch(
  "/:facultyId",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

export const FacultyRoutes = router;
