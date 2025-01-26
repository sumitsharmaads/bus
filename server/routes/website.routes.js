import express from "express";
import {
  getWebisteInfoById,
  getWebsiteInfo,
  websiteUpdateController,
} from "../controllers/website.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
const router = express.Router();

router.get("/", getWebsiteInfo);
router.get("/:id", validateAccessToken, getWebisteInfoById);
router.put("/:id", validateAccessToken, websiteUpdateController);

export default router;
