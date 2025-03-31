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

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll(req.body);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Fetched user informations",
      result: users,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserByAdmin = async (req, res, next) => {
  try {
    const userData = req.body;
    userData.createdByAdmin = true;

    const existing = await User.findOne({
      $or: [
        { email: userData.email },
        // { username: userData.username },
        { phone: userData.phone },
      ],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User with same email, username or phone already exists.",
      });
    }

    const newUser = await User.register(userData);

    return res.status(201).json({
      success: true,
      message: "User created successfully by admin",
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.updateUser(id, updatedData);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "fullname email username phone gender roleType"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
};
