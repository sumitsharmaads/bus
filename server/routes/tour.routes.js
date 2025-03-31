import express from "express";
import {
  addTour,
  createTour,
  deleteTour,
  getAllAdminTours,
  getTourById,
  upcomingTours,
  updateTourPatch,
  updateTourPut,
} from "../controllers/tour.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

//router.post("/", validateAccessToken, addTour);
router.get("/upcoming-tours", upcomingTours);
router.post("/admin/getAll", validateAccessToken, isAdmin, getAllAdminTours);

router.post("/", validateAccessToken, isAdmin, createTour);
//router.get("/", filterTours); // supports query filters
router.get("/:id", getTourById);
router.patch("/:id", validateAccessToken, isAdmin, updateTourPatch);
router.put("/:id", validateAccessToken, isAdmin, updateTourPut);
router.delete("/:id", validateAccessToken, isAdmin, deleteTour);

export default router;
