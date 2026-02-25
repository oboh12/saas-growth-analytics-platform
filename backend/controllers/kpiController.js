import fs from "fs";
import path from "path";
import { Parser } from "json2csv";

// Utility to safely divide
const safeDivide = (num, denom) => (denom === 0 ? 0 : num / denom);

// ---------------------------------------------------
// 🔹 Get Campaign KPIs (JSON API)
// ---------------------------------------------------
export const getCampaignKPIs = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "campaigns.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const campaigns = JSON.parse(raw);

    if (!Array.isArray(campaigns) || campaigns.length === 0) {
      return res.status(400).json({ message: "No campaign data found" });
    }

    const processed = campaigns.map((c) => {
      const openRate = safeDivide(c.emailsOpened, c.emailsSent) * 100;
      const clickThroughRate = safeDivide(c.emailsClicked, c.emailsOpened) * 100;
      const conversionRate = safeDivide(c.conversions, c.emailsClicked) * 100;
      const unsubscribeRate = safeDivide(c.unsubscribes, c.emailsSent) * 100;

      const engagementScore =
        openRate * 0.3 +
        clickThroughRate * 0.3 +
        conversionRate * 0.3 -
        unsubscribeRate * 0.1;

      return {
        campaignName: c.campaignName,
        openRate: openRate,
        clickThroughRate: clickThroughRate,
        conversionRate: conversionRate,
        unsubscribeRate: unsubscribeRate,
        engagementScore: engagementScore,
      };
    });

    // Summary metrics
    const totals = processed.reduce(
      (acc, c) => {
        acc.openRate += c.openRate;
        acc.clickThroughRate += c.clickThroughRate;
        acc.conversionRate += c.conversionRate;
        acc.unsubscribeRate += c.unsubscribeRate;
        acc.engagementScore += c.engagementScore;
        return acc;
      },
      {
        openRate: 0,
        clickThroughRate: 0,
        conversionRate: 0,
        unsubscribeRate: 0,
        engagementScore: 0,
      }
    );

    const count = processed.length;

    const averages = {
      openRate: (totals.openRate / count).toFixed(2) + "%",
      clickThroughRate: (totals.clickThroughRate / count).toFixed(2) + "%",
      conversionRate: (totals.conversionRate / count).toFixed(2) + "%",
      unsubscribeRate: (totals.unsubscribeRate / count).toFixed(2) + "%",
      engagementScore: (totals.engagementScore / count).toFixed(2),
    };

    const sorted = [...processed].sort(
      (a, b) => b.engagementScore - a.engagementScore
    );

    res.json({
      summary: {
        totalCampaigns: count,
        averageKPIs: averages,
        bestCampaign: sorted[0]?.campaignName,
        worstCampaign: sorted[sorted.length - 1]?.campaignName,
      },
      campaigns: processed,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------------------------------------
// 🔹 Export KPI Data to CSV
// ---------------------------------------------------
export const exportKPIToCSV = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "campaigns.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const campaigns = JSON.parse(raw);

    if (!Array.isArray(campaigns) || campaigns.length === 0) {
      return res.status(400).json({ message: "No campaign data found" });
    }

    const processed = campaigns.map((c) => {
      const openRate = safeDivide(c.emailsOpened, c.emailsSent) * 100;
      const clickThroughRate = safeDivide(c.emailsClicked, c.emailsOpened) * 100;
      const conversionRate = safeDivide(c.conversions, c.emailsClicked) * 100;
      const unsubscribeRate = safeDivide(c.unsubscribes, c.emailsSent) * 100;

      const engagementScore =
        openRate * 0.3 +
        clickThroughRate * 0.3 +
        conversionRate * 0.3 -
        unsubscribeRate * 0.1;

      return {
        campaignName: c.campaignName,
        openRate: openRate.toFixed(2),
        clickThroughRate: clickThroughRate.toFixed(2),
        conversionRate: conversionRate.toFixed(2),
        unsubscribeRate: unsubscribeRate.toFixed(2),
        engagementScore: engagementScore.toFixed(2),
      };
    });

    const parser = new Parser();
    const csv = parser.parse(processed);

    res.header("Content-Type", "text/csv");
    res.attachment("campaign_kpis.csv");
    return res.send(csv);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};