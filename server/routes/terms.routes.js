import express from "express";
import { getTerms, addOrUpdateTerms } from "../controllers/terms.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";

const router = express.Router();

router.get("/", getTerms);
router.post("/update", validateAccessToken, addOrUpdateTerms);

export default router;
