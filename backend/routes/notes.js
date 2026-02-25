const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { auth } = require("express-oauth2-jwt-bearer");
const axios = require("axios");

// ✅ Auth0 middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

// ✅ Get all notes for logged-in user
router.get("/", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// ✅ Create a new note
router.post("/", checkJwt, async (req, res) => {
  try {
    const userId = req.auth.payload.sub;
    const { title, content } = req.body;
    const note = new Note({ title, content, userId });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Error creating note" });
  }
});

// ✅ Summarize a note using AI (OpenAI or HuggingFace)
router.post("/summarize", checkJwt, async (req, res) => {
  try {
    const { content } = req.body;

    // Example using Hugging Face Inference API (free tier)
    const HF_API_KEY = process.env.HF_API_KEY;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: content },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    const summary = response.data[0]?.summary_text || "No summary generated";
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI summarization failed" });
  }
});

module.exports = router;