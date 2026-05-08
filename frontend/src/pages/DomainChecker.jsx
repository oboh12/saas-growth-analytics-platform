import { useState } from "react";
import api from "../lib/api"; // ✅ replaced axios

export default function DomainChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);

  const checkDomain = async () => {
    try {
      const res = await api.post("/api/domain/domain-check", {
        domain,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Domain check failed");
    }
  };

  return (
    <div>
      <h2>Domain Checker</h2>

      <input
        placeholder="Enter domain (e.g. google.com)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />

      <button onClick={checkDomain}>
        Check Domain
      </button>

      {result && (
        <div>
          {/* ✅ Color indicators */}
          <p style={{ color: result.score > 80 ? "green" : "red" }}>
            Score: {result.score}
          </p>

          <p style={{ color: result.status === "Good" ? "green" : "red" }}>
            Status: {result.status}
          </p>
        </div>
      )}
    </div>
  );
}