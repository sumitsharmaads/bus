import express from "express";
import { getFAQs, addOrUpdateFAQs } from "../controllers/faq.controller.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/update", addOrUpdateFAQs);

export default router;
