import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../OfferedCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { Student } from "../students/student.model";
import mongoose from "mongoose";

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse
) => {
  /**
   * Step1: Check if the offered cousres is exists
   * Step2: Check if the student is already enrolled
   * Step3: Check if the max credits exceed
   * Step4: Create an enrolled course
   */

  const { offeredCourse } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }

  //   * Step3: Check if the max credits exceed

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Room is full !");
  }

  const student = await Student.findOne({ id: userId }).select("id");

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found !");
  }

  // check if student is already enrolled
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, "Student is already enrolled !");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExists.semesterRegistration,
          academicSemester: isOfferedCourseExists.academicSemester,
          academicFaculty: isOfferedCourseExists.academicFaculty,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
          isEnrolled: true,
        },
      ],
      { session }
    );

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to enroll in this cousre !"
      );
    }

    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  //   updateEnrolledCourseMarksIntoDB,
};
