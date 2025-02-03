import express from "express";
import {
  addPlace,
  bulkUploadPlaces,
  checkCityExists,
  getAllPlaces,
  getPlacesDetails,
  updatePlace,
} from "../controllers/places.controller.js";

const router = express.Router();

router.post("/cities", getPlacesDetails);
router.post("/add", addPlace);
router.put("/:id", updatePlace);
router.post("/check", checkCityExists);
router.post("/admin/getAll", getAllPlaces);
router.post("/upload", bulkUploadPlaces);

export default router;
