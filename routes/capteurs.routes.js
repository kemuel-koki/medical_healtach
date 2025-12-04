// routes/capteurs.routes.js
import express from "express";
import {
  createCapteur,
  getCapteurs,
  getStatsRythmeCardiaque,
} from "../controllers/CapteursController.js";

const router = express.Router();

//POST /capteurs
router.post("/", createCapteur);

//GET /capteurs
router.get("/", getCapteurs);

//GET /capteurs/stats/rythme-cardiaque
router.get("/stats/rythme-cardiaque", getStatsRythmeCardiaque);

export default router;
