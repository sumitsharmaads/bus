import express from "express";
import {
  contactHandler,
  inqueryHandler,
} from "../controllers/contact.controller.js";
import {
  localServiceController,
  outStationServiceController,
} from "../controllers/rentalService.controller.js";

const router = express.Router();

router.post("/contact", contactHandler);
router.post("/inquery", inqueryHandler);
router.post("/local", localServiceController);
router.post("/outstation", outStationServiceController);

export default router;
