import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🔵 CREATE USER (POST)
router.post("/create", async (req, res) => {
  console.log("POST /create route hit"); // 👈 DEBUG LOG

  try {
    const user = new User(req.body);
    await user.save();

    res.json({ message: "User created!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 GET ALL USERS (GET)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;