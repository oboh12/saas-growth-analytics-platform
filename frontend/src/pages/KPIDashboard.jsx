import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";

export default function KPIDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/kpi")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        📊 Campaign KPI Dashboard
      </h1>

      <Link
        to="/"
        className="text-indigo-600 font-semibold hover:underline"
      >
        ← Back to Lotto Dashboard
      </Link>

      {/* KPI Table */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Campaign Metrics</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-100">
              <th className="p-2">Campaign</th>
              <th className="p-2">Open Rate (%)</th>
              <th className="p-2">CTR (%)</th>
              <th className="p-2">Conversion Rate (%)</th>
              <th className="p-2">Engagement Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2">{c.campaignName}</td>
                <td>{c.openRate}</td>
                <td>{c.clickThroughRate}</td>
                <td>{c.conversionRate}</td>
                <td className="font-semibold text-indigo-600">
                  {c.engagementScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open Rate Chart */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Open Rate Comparison
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campaignName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="openRate" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Score Chart */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Engagement Score Ranking
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campaignName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="engagementScore" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}