import express from "express";
import { getTerms, addOrUpdateTerms } from "../controllers/terms.controller.js";

const router = express.Router();

router.get("/", getTerms);
router.post("/update", addOrUpdateTerms);

export default router;
