import fs from "fs";
import path from "path";

export const getCohortData = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "cohorts.json");
    const raw = fs.readFileSync(filePath);
    const cohorts = JSON.parse(raw);

    const processed = cohorts.map(c => {
      return {
        signupMonth: c.signupMonth,
        retentionMonth2: ((c.month2 / c.month1) * 100).toFixed(2),
        retentionMonth3: ((c.month3 / c.month1) * 100).toFixed(2)
      };
    });

    res.json(processed);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};