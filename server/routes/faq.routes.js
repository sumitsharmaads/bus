import express from "express";
import { getFAQs, addOrUpdateFAQs } from "../controllers/faq.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/update", validateAccessToken, isAdmin, addOrUpdateFAQs);

export default router;
