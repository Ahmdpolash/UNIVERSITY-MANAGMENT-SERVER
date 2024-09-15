import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  name: z.string({ message: "Academic Faculty name must be string" }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
};
