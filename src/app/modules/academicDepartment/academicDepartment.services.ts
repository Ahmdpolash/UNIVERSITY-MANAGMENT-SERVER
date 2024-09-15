import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentIntoDb = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentIntoDb = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: TAcademicDepartment
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};
export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentIntoDb,
  getSingleAcademicDepartmentIntoDb,
  updateAcademicDepartmentIntoDb,
};
