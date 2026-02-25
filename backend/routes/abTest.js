import express from "express";
import { getABTestResults } from "../controllers/abTestController.js";

const router = express.Router();

router.get("/", getABTestResults);

export default router;