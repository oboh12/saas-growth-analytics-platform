import express from "express";
import {
  getCampaignKPIs,
  exportKPIToCSV
} from "../controllers/kpiController.js";

const router = express.Router();

// 🔹 Get Campaign KPI Analytics (JSON)
router.get("/", getCampaignKPIs);

// 🔹 Export KPI Data to CSV
router.get("/export", exportKPIToCSV);

export default router;