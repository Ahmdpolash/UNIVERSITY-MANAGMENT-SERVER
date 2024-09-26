import { Router } from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = Router();

router.get("/", FacultyControllers.getAllFaculties);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

export const FacultyRoutes = router;
