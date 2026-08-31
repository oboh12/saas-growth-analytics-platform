import express from "express";
import { analyzeDomain } from "../controllers/domainController.js";
import DomainCheck from "../models/DomainCheck.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Analyze a domain (Public)
router.post("/domain-check", analyzeDomain);

// Fetch analysis history (Private)
router.get("/history", protect, async (req, res) => {
  try {
    const history = await DomainCheck.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(history);
  } catch (error) {
    console.error("History fetch error:", error);

    res.status(500).json({
      message: "Error fetching history",
    });
  }
});

export default router; 