import express from "express";
import {
  getSEOByRoute,
  getAllSEOs,
  createOrUpdateSEO,
  deleteSEO,
  getSEOById,
  updateSEOById,
} from "../controllers/seo.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";
const router = express.Router();

router.get("/", getSEOByRoute); // expects: ?path=/about

router.get("/getAll", validateAccessToken, isAdmin, getAllSEOs); // optional: ?page=1&limit=10&route=/about

router.get("/:id", validateAccessToken, isAdmin, getSEOById);

// ✅ Admin: Create or Update SEO
router.post("/", validateAccessToken, isAdmin, createOrUpdateSEO); // expects body with route, title, etc.

// ✅ Admin: Delete SEO data by route
router.delete("/:route", validateAccessToken, isAdmin, deleteSEO); // expects route param in URL

router.put("/:id", validateAccessToken, isAdmin, updateSEOById);

export default router;
