import Note from "../models/Note.js";
import {
  analyzeSentiment,
  getWordFrequency,
  compareLength
} from "../utils/textAnalytics.js";

export const getAnalytics = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.sub });

    const processed = notes.map((note) => {
      const sentiment = analyzeSentiment(note.content);
      const wordFreq = getWordFrequency(note.content);
      const lengthComparison = compareLength(
        note.content,
        note.summary || ""
      );

      return {
        title: note.title,
        sentimentScore: sentiment.score,
        sentimentComparative: sentiment.comparative,
        wordFrequency: wordFreq,
        lengthComparison
      };
    });

    res.json(processed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};