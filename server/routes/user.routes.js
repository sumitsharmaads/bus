import express from "express";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import {
  changePassword,
  updateUser,
  getAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/change-password/:id", validateAccessToken, changePassword);
router.post("/update-user/:id", validateAccessToken, updateUser);
router.post("/getAll", validateAccessToken, getAllUsers);

export default router;
