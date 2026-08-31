import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function DomainChecker() {
  const navigate = useNavigate();

  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkDomain = async () => {
    if (!domain.trim()) {
      alert("Please enter a domain.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/domain/domain-check", {
        domain,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Domain check failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setDomain("");
    setResult(null);
  };

  // Temporary reputation scoring
  // (Replace later with blacklist + AI scoring)

  const getReputation = () => {
    if (!result) return {};

    if (result.score >= 90)
      return {
        label: "Excellent",
        stars: "⭐⭐⭐⭐⭐",
        color: "text-green-600",
      };

    if (result.score >= 80)
      return {
        label: "Very Good",
        stars: "⭐⭐⭐⭐☆",
        color: "text-green-500",
      };

    if (result.score >= 70)
      return {
        label: "Good",
        stars: "⭐⭐⭐☆☆",
        color: "text-yellow-600",
      };

    if (result.score >= 50)
      return {
        label: "Fair",
        stars: "⭐⭐☆☆☆",
        color: "text-orange-500",
      };

    return {
      label: "Poor",
      stars: "⭐☆☆☆☆",
      color: "text-red-600",
    };
  };

  const reputation = getReputation();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-indigo-700 text-white py-12 shadow">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            AI Email Deliverability Assistant
          </h1>

          <p className="mt-3 text-indigo-100 text-lg">
            Analyze your email domain using AI-powered deliverability insights.
          </p>

        </div>

      </div>

      {/* Analyzer */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Analyze a Domain
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={checkDomain}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>

          </div>

        </div>

        {result && (

          <>

            {/* Summary */}

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-gray-500">
                  Deliverability Score
                </h3>

                <p className="text-5xl font-bold text-indigo-700 mt-3">
                  {result.score}
                </p>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-gray-500">
                  Status
                </h3>

                <p className="text-2xl font-bold mt-3">
                  {result.status}
                </p>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-gray-500">
                  SPF
                </h3>

                <p className="text-xl font-bold mt-3">
                  {result.spf ? "Detected ✅" : "Missing ❌"}
                </p>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-gray-500">
                  DMARC
                </h3>

                <p className="text-xl font-bold mt-3">
                  {result.dmarc ? "Configured ✅" : "Missing ❌"}
                </p>

              </div>

              <div className="bg-white rounded-xl shadow p-6">

                <h3 className="text-gray-500">
                  Reputation
                </h3>

                <p className="text-3xl mt-3">
                  {reputation.stars}
                </p>

                <p className={`font-bold mt-2 ${reputation.color}`}>
                  {reputation.label}
                </p>

              </div>

            </div>

            {/* AI Recommendations */}

            <div className="bg-white rounded-xl shadow p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5">
                AI Recommendations
              </h2>

              <ul className="list-disc pl-6 space-y-3">

                {result.spf ? (
                  <li>✅ SPF record detected.</li>
                ) : (
                  <li>Configure an SPF record.</li>
                )}

                {result.dmarc ? (
                  <li>✅ DMARC policy detected.</li>
                ) : (
                  <li>Configure a DMARC policy.</li>
                )}

                <li>
                  Continue monitoring sender reputation.
                </li>

                <li>
                  Regularly review DNS configuration.
                </li>

              </ul>

            </div>

            {/* Action Buttons */}

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={resetAnalysis}
                className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Analyze Another Domain
              </button>

              <button
                onClick={() =>
                  navigate("/reports", {
                    state: {
                      domain,
                      score: result.score,
                      status: result.status,
                      spf: result.spf,
                      dmarc: result.dmarc,
                      reputation: reputation.label,
                    },
                  })
                }
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                View Professional Report
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}