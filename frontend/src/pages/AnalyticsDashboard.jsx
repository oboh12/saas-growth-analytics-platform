import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/analytics")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data.length) return <p>Loading analytics...</p>;

  const firstNote = data[0];

  const wordChartData = Object.entries(firstNote.wordFrequency)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Text Analytics Dashboard</h2>

      <h3 className="text-xl mt-6">Word Frequency</h3>
      <BarChart width={600} height={300} data={wordChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="word" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>

      <h3 className="text-xl mt-6">Summary Reduction</h3>
      <p>
        Original Length: {firstNote.lengthComparison.originalLength}
      </p>
      <p>
        Summary Length: {firstNote.lengthComparison.summaryLength}
      </p>
      <p>
        Reduction: {firstNote.lengthComparison.reductionPercentage.toFixed(2)}%
      </p>

      <h3 className="text-xl mt-6">Sentiment Score</h3>
      <p>Score: {firstNote.sentimentScore}</p>
      <p>Comparative: {firstNote.sentimentComparative}</p>
    </div>
  );
}