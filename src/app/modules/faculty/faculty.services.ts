import { TFaculty } from "./faculty.interface";
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

//update
const updateFacultyIntoDb = async (id: string, payload: Partial<TFaculty>) => {
  const { name, academicDepartment, ...remainingFacultyData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (academicDepartment && Object.keys(academicDepartment).length) {
    for (const [key, value] of Object.entries(academicDepartment)) {
      modifiedData[`academicDepartment.${key}`] = value;
    }
  }

  const result = await Faculty.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
  return result;
};




export const FacultyServices = {
  getAllFacultiesFromDb,
  getSingleFacultyFromDb,
  updateFacultyIntoDb,
};
