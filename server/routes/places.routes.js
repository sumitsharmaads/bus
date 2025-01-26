import express from "express";
import { getPlacesDetails } from "../controllers/places.controller.js";

const router = express.Router();

router.post("/cities", getPlacesDetails);

export default router;
