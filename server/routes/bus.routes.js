import express from "express";
import {
  getBuses,
  getBus,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";

const router = express.Router();

router.get("/", getBuses);
router.get("/:id", getBus);
router.post("/add", addBus);
router.put("/update/:id", updateBus);
router.delete("/delete/:id", deleteBus);

export default router;
