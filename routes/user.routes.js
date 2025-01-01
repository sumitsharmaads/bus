import express from "express";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { changePassword } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/change-password/:id", validateAccessToken, changePassword);

export default router;
