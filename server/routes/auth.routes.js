import express from "express";
import {
  forgotPassword,
  login,
  logoutHandler,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { validateOtp } from "../middlewares/otp.auth.middleware.js";
import { refreshToken } from "../controllers/referesh.controller.js";
import { websiteDetails } from "../middlewares/webiste.email.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", websiteDetails, login);
router.post("/verify-otp", validateOtp, verifyOtp);
router.post("/forgot-password", websiteDetails, forgotPassword);
router.post("/reset-password", validateOtp, resetPassword);
router.get("/refresh-token", refreshToken);
router.get("/logout", logoutHandler);

export default router;
