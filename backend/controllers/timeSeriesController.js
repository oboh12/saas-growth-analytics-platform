import fs from "fs";
import path from "path";

export const getTimeSeries = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "timeSeries.json");
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    const growth = data.map((d, i) => {
      if (i === 0) return { ...d, growth: 0 };
      const prev = data[i - 1].revenue;
      const rate = ((d.revenue - prev) / prev) * 100;
      return { ...d, growth: rate.toFixed(2) };
    });

    res.json(growth);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};