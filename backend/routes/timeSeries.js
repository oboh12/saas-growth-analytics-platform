import express from "express";
import { getTimeSeries } from "../controllers/timeSeriesController.js";

const router = express.Router();

router.get("/", getTimeSeries);

export default router;