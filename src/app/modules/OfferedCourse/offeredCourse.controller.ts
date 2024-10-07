import catchAsync from "../../utils/catchAsync";
import { OfferedCourseServices } from "./offeredCourse.services";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Offered course created successfully",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
};
