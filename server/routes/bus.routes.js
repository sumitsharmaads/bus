import express from "express";
import {
  getBuses,
  getBus,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";

const router = express.Router();

router.get("/", getBuses);
router.get("/:id", getBus);
router.post("/add", validateAccessToken, addBus);
router.put("/update/:id", validateAccessToken, updateBus);
router.delete("/delete/:id", validateAccessToken, deleteBus);

export default router;
