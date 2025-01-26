import express from "express";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../config/mutler.config.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";

const router = express.Router();

router.post(
  "/upload",
  validateAccessToken,
  upload.single("image"),
  uploadImage
);
router.delete("/image/:public_id", validateAccessToken, deleteImage);

export default router;
