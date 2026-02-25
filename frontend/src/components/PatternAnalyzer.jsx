// ==============================
// 🔢 PatternAnalyzer.jsx
// ==============================
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const PatternAnalyzer = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [numbersInput, setNumbersInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    const nums = numbersInput
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length < 2) {
      alert("Please enter at least two numbers separated by commas (e.g., 3, 6, 9, 12)");
      return;
    }

    try {
      setLoading(true);
      const token = await getAccessTokenSilently();

      const res = await axios.post(
        "http://localhost:5000/api/analyze-pattern",
        { numbers: nums },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAnalysisResult(res.data);
    } catch (err) {
      console.error("❌ Error analyzing pattern:", err);
      alert("Failed to analyze pattern. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-xl font-semibold mb-3">🔢 Pattern Analyzer</h2>
      <p className="text-sm text-gray-500 mb-3">
        Enter 2–10 numbers (range 1–99), separated by commas.
      </p>

      <input
        type="text"
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring focus:ring-blue-200 outline-none"
        placeholder="e.g., 5, 10, 20, 40, 80"
        value={numbersInput}
        onChange={(e) => setNumbersInput(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        {loading ? "Analyzing..." : "Analyze Pattern"}
      </button>

      {analysisResult && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border text-gray-700">
          <p className="font-semibold">🧮 Pattern Type:</p>
          <p>{analysisResult.patternType}</p>

          <p className="font-semibold mt-2">📈 Average Difference:</p>
          <p>{analysisResult.averageDifference}</p>

          <p className="font-semibold mt-2">📊 Average Ratio:</p>
          <p>{analysisResult.averageRatio}</p>

          <p className="font-semibold mt-2">🔮 Predicted Next ({analysisResult.predictedNextNumbers.length} numbers):</p>
          <ul className="list-disc list-inside">
            {analysisResult.predictedNextNumbers.map((num, idx) => (
              <li key={idx}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatternAnalyzer;