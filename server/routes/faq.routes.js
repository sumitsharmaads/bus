import express from "express";
import { getFAQs, addOrUpdateFAQs } from "../controllers/faq.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/update", validateAccessToken, addOrUpdateFAQs);

export default router;
