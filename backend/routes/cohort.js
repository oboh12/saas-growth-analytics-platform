import express from "express";
import { getCohortData } from "../controllers/cohortController.js";

const router = express.Router();

router.get("/", getCohortData);

export default router;