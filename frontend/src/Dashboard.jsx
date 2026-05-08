import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.get("/api/domain/history");
      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Your History</h2>

      {history.map((item, index) => (
        <div key={index}>
          <p>{item.domain}</p>
          <p>{item.score}</p>
        </div>
      ))}
    </div>
  );
}