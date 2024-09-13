import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academicSemester.services";

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDb(
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Academic Semester created successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
