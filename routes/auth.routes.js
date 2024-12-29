import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { validateOtp } from "../middlewares/otp.auth.middleware.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { changePassword } from "../controllers/user.controller.js";
import { refreshToken } from "../controllers/referesh.controller.js";

const router = express.Router();

/**
 * Below are all necessary auth routes which should not easily get accessed
 */
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", validateOtp, verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateOtp, resetPassword);
router.post("/change-password/:id", validateAccessToken, changePassword);
router.get("/refresh-token", refreshToken);

/**admin related user*/
router.post("/admin/user");
router.put("/admin/user/:id");
router.delete("/admin/user/:id");
router.get("/admin/user/:id");
router.all("/admin/getAll");

/**admin related locations */
router.post("/admin/location");
router.put("/admin/location/:id");
router.delete("/admin/location/:id");
router.get("/admin/location/:id");
router.all("/admin/location");

/**admin booking */
router.post("/admin/tour-package");
router.get("/admin/tour-package/:id");
router.put("/admin/tour-package/:id");
router.delete("/admin/tour-package/:id");

export default router;
