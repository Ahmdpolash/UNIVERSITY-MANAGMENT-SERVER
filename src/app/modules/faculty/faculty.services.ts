import { Faculty } from "./faculty.model";

const getAllFacultiesFromDb = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFacultyFromDb = async (id: string) => {
  // const result = await Faculty.findById(id);
  const result = await Faculty.findOne({ id }).populate("academicDepartment");

  return result;
};

export const FacultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
};
