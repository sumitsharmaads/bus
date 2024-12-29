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
    next(error);
  }
};
