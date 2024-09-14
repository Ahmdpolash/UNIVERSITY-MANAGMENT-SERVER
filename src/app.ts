import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoute } from "./app/modules/user/user.route";
import { StudentRoute } from "./app/modules/students/student.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("University Managment Services - 2.0 , Backend Server ..!");
});

//middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
