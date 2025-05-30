import express from "express";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import {
  changePassword,
  updateUser,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  createUserByAdmin,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.post("/change-password/:id", validateAccessToken, changePassword);
router.post("/update-user/:id", validateAccessToken, updateUser);
router.post("/getAll", validateAccessToken, getAllUsers);
router.post("/admin/add", validateAccessToken, isAdmin, createUserByAdmin);
router.put("/admin/:id", validateAccessToken, isAdmin, updateUserByAdmin);
router.get("/admin/:id", validateAccessToken, isAdmin, getUserById);

export default router;
