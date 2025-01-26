import express from "express";
import { addTour, upcomingTours } from "../controllers/tour.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";

const router = express.Router();

router.post("/", validateAccessToken, addTour);
router.get("/upcoming-tours", upcomingTours);

export default router;
