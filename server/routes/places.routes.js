import express from "express";
import {
  addPlace,
  bulkUploadPlaces,
  checkCityExists,
  getAllPlaces,
  getPlacesDetails,
  updatePlace,
} from "../controllers/places.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.post("/cities", getPlacesDetails);
router.post("/add", validateAccessToken, isAdmin, addPlace);
router.put("/:id", validateAccessToken, isAdmin, updatePlace);
router.post("/check", checkCityExists);
router.post("/admin/getAll", validateAccessToken, isAdmin, getAllPlaces);
router.post("/upload", validateAccessToken, bulkUploadPlaces);

export default router;
