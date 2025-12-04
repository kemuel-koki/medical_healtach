import express from "express";
import { addPatient, getPatients, getStatsAge } from "../controllers/patients.controller.js";

const router = express.Router();

router.post("/", addPatient);          // POST /patients
router.get("/", getPatients);          // GET /patients
router.get("/stats/age", getStatsAge); // GET /patients/stats/age

export default router;
