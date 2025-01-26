import express from "express";
import {
  contactHandler,
  inqueryHandler,
} from "../controllers/contact.controller.js";
import {
  localServiceController,
  outStationServiceController,
} from "../controllers/rentalService.controller.js";
import { websiteDetails } from "../middlewares/webiste.email.middlewares.js";

const router = express.Router();

router.post("/contact", websiteDetails, contactHandler);
router.post("/inquery", websiteDetails, inqueryHandler);
router.post("/local", websiteDetails, localServiceController);
router.post("/outstation", websiteDetails, outStationServiceController);

export default router;
