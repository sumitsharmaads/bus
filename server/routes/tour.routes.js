import express from "express";
import {
  addTour,
  createTour,
  deleteTour,
  getAllAdminTours,
  getStateWiseData,
  getTourById,
  searchTourByName,
  upcomingTours,
  updateTourPatch,
  updateTourPut,
} from "../controllers/tour.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

//router.post("/", validateAccessToken, addTour);
router.get("/upcoming-tours", upcomingTours);
router.get("/state-breakup", getStateWiseData);
router.get("/smartSearch", searchTourByName);
router.get("/:id", getTourById);

router.post("/", validateAccessToken, isAdmin, createTour);
router.post("/admin/getAll", validateAccessToken, isAdmin, getAllAdminTours);
//router.get("/", filterTours); // supports query filters
router.patch("/:id", validateAccessToken, isAdmin, updateTourPatch);
router.put("/:id", validateAccessToken, isAdmin, updateTourPut);
router.delete("/:id", validateAccessToken, isAdmin, deleteTour);

export default router;
