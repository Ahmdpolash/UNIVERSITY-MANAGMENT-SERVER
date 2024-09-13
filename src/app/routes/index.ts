import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { StudentRoute } from "../modules/students/student.route";
import { AcademicSemesterRoute } from "../modules/academicSemester/academicSemester.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/students",
    route: StudentRoute,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// router.use("/users", UserRoute);
// router.use("/students", StudentRoute);

export default router;
