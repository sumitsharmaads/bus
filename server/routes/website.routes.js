import express from "express";
import {
  getWebisteInfoById,
  getWebsiteInfo,
  websiteUpdateController,
} from "../controllers/website.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";
const router = express.Router();

router.get("/", getWebsiteInfo);
router.get("/:id", validateAccessToken, getWebisteInfoById);
router.put("/:id", validateAccessToken, isAdmin, websiteUpdateController);

export default router;
