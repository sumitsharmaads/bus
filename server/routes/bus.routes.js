import express from "express";
import {
  getBuses,
  getBus,
  addBus,
  updateBus,
  deleteBus,
} from "../controllers/bus.controller.js";
import { validateAccessToken } from "../middlewares/accessjwt.auth.midlleware.js";
import { isAdmin } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.get("/", validateAccessToken, getBuses);
router.get("/:id", getBus);
router.post("/add", validateAccessToken, isAdmin, addBus);
router.put("/update/:id", validateAccessToken, isAdmin, updateBus);
router.delete("/delete/:id", validateAccessToken, isAdmin, deleteBus);

export default router;
