import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";

function LottoDashboard() {
  const [gameName, setGameName] = useState("premier_tota");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeGame = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/predict/${gameName}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        🎯 Lotto Analyzer Dashboard
      </h1>

      {/* Navigation */}
      <div className="mb-4">
        <Link
          to="/analytics"
          className="text-indigo-600 font-semibold hover:underline"
        >
          Go to Analytics Dashboard →
        </Link>
      </div>

      <div className="flex items-center space-x-3 mb-4">
        <label className="font-semibold">Select Game:</label>
        <select
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="premier_tota">Premier Tota</option>
          <option value="premier_markii">Premier Mark II</option>
          <option value="premier_vag">Premier Vag</option>
          <option value="premier_midweek">Premier Midweek</option>
          <option value="premier_enugu">Premier Enugu</option>
          <option value="premier_lucky">Premier Lucky</option>
        </select>

        <button
          onClick={analyzeGame}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {result && result.success && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
            {result.game.replace("_", " ")} Analysis
          </h2>

          <p>
            <strong>Date:</strong> {result.predictionDate}
          </p>
          <p>
            <strong>Confidence:</strong>{" "}
            <span className="text-indigo-600 font-bold">
              {result.confidence}%
            </span>
          </p>

          <div className="mt-3">
            <p>
              <strong>Total Numbers:</strong> {result.totalCount}
            </p>
            <p>
              <strong>Sum:</strong> {result.sum}
            </p>
            <p>
              <strong>Average:</strong> {result.average.toFixed(2)}
            </p>
          </div>

          <div className="mt-3">
            <p>
              <strong>🔥 Hot Numbers:</strong>{" "}
              {result.hot.map((h) => h.num).join(", ")}
            </p>
            <p>
              <strong>🌤️ Warm Numbers:</strong>{" "}
              {result.warm.map((h) => h.num).join(", ")}
            </p>
            <p>
              <strong>❄️ Cool Numbers:</strong>{" "}
              {result.cool.map((h) => h.num).join(", ")}
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-indigo-700">
              🎯 Predicted Next Numbers:
            </p>
            <p className="text-lg font-bold text-green-600">
              {result.prediction.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LottoDashboard />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
  );
}