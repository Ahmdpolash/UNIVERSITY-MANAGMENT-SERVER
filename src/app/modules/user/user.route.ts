import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-student", UserController.createStudent);
router.get("/get-student", UserController.createStudent);

export const UserRoute = router;
