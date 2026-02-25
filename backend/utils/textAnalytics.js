import Sentiment from "sentiment";

const sentiment = new Sentiment();

/**
 * Analyze sentiment of text
 * Returns sentiment score + comparative value
 */
export const analyzeSentiment = (text) => {
  if (!text) return { score: 0, comparative: 0 };

  const result = sentiment.analyze(text);

  return {
    score: result.score,
    comparative: result.comparative,
  };
};

/**
 * Generate word frequency map
 * Removes punctuation, converts to lowercase,
 * excludes common stopwords
 */
export const getWordFrequency = (text) => {
  if (!text) return {};

  const stopWords = [
    "the", "is", "in", "and", "or", "of",
    "to", "a", "an", "it", "this", "that",
    "for", "on", "with", "as", "at", "by",
    "from", "be", "are", "was", "were"
  ];

  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .split(/\s+/);

  const frequency = {};

  cleaned.forEach((word) => {
    if (!stopWords.includes(word) && word.length > 2) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  return frequency;
};

/**
 * Compare original text length vs summary length
 */
export const compareLength = (original, summary) => {
  const originalLength = original ? original.split(/\s+/).length : 0;
  const summaryLength = summary ? summary.split(/\s+/).length : 0;

  const reductionPercentage =
    originalLength > 0
      ? ((originalLength - summaryLength) / originalLength) * 100
      : 0;

  return {
    originalLength,
    summaryLength,
    reductionPercentage: Number(reductionPercentage.toFixed(2)),
  };
};