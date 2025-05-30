import express from "express";
import { getTerms, addOrUpdateTerms } from "../controllers/terms.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.get("/", getTerms);
router.post("/update", validateAccessToken, isAdmin, addOrUpdateTerms);

export default router;
