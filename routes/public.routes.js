import express from "express";
import {
  contactHandler,
  inqueryHandler,
} from "../controllers/contact.controller.js";
import { deleteImage, uploadImage } from "../controllers/image.controller.js";
import upload from "../config/mutler.config.js";

const router = express.Router();

router.post("/contact", contactHandler);
router.post("/inquery", inqueryHandler);
router.post("/rental");
router.post("/upload", upload.single("image"), uploadImage);
router.delete("/image/:public_id", deleteImage);
router.get("/cities");
/**Add booking routes */

export default router;
