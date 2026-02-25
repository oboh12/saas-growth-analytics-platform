import fs from "fs";
import path from "path";

/**
 * Two-proportion z-test
 */
const zTest = (p1, p2, n1, n2) => {
  const pooled =
    (p1 * n1 + p2 * n2) / (n1 + n2);

  const standardError = Math.sqrt(
    pooled * (1 - pooled) * (1 / n1 + 1 / n2)
  );

  const zScore = (p2 - p1) / standardError;

  return zScore;
};

export const getABTestResults = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "abTest.json");
    const raw = fs.readFileSync(filePath);
    const data = JSON.parse(raw);

    const calculateMetrics = (variant) => {
      const openRate = variant.emailsOpened / variant.emailsSent;
      const ctr = variant.emailsClicked / variant.emailsOpened;
      const conversionRate =
        variant.conversions / variant.emailsClicked;

      return { openRate, ctr, conversionRate };
    };

    const A = calculateMetrics(data.variantA);
    const B = calculateMetrics(data.variantB);

    const zScore = zTest(
      A.conversionRate,
      B.conversionRate,
      data.variantA.emailsClicked,
      data.variantB.emailsClicked
    );

    const significant = Math.abs(zScore) > 1.96; // 95% confidence

    res.json({
      variantA: A,
      variantB: B,
      zScore: zScore.toFixed(3),
      statisticallySignificant: significant
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};