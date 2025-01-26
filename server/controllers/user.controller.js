import mongoose from "mongoose";
import User from "../models/user.model.js";

export const changePassword = async (req, res, next) => {
  console.log("Controller: inside changePassword");
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id) || !oldPassword || !newPassword) {
    console.log("changePassword: note  a valid id.", id);
    return next(createError(400, "Please provide all mandatory fields"));
  }
  try {
    const user = await User.changePassword(id, oldPassword, newPassword);
    if (!user) {
      console.log("Error: User not found.");
      return next(createError(404, "Failed to update password"));
    }
    console.log("User password updated successfully");
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User password updated successfully.",
    });
  } catch (error) {
    console.log("change password error", error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  console.log("Controller: inside updateUser");
  const { id } = req.params;
  try {
    const user = await User.updateUser(id, req.body, {
      fullname: 1,
      email: 1,
      phone: 1,
      username: 1,
      roleType: 1,
      gender: 1,
    });
    if (!user) {
      console.log("Error: User not found.");
      return next(createError(404, "Failed to update user"));
    }
    console.log("User password updated successfully");
    return res.status(200).json({
      success: true,
      status: 200,
      message: "User information updated successfully.",
      result: user,
    });
  } catch (error) {
    console.log("change password error", error);
    next(error);
  }
};
