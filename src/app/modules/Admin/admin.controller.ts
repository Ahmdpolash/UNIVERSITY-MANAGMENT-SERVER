import catchAsync from "../../utils/catchAsync";
import { StudentServices } from "./admin.services";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllAdminsFromDb();

  res.status(200).json({
    success: true,
    message: "All Admins retrieved successfully",
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await StudentServices.getSingleAdminFromDb(adminId);

  res.status(200).json({
    success: true,
    message: "Single Admins retrieved successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await StudentServices.deleteAdminFromDb(adminId);

  res.status(200).json({
    success: true,
    message: " Admin deleted successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;

  const result = await StudentServices.updateAdminIntoDb(adminId, admin);
  res.status(200).json({
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
