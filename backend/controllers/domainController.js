import DomainCheck from "../models/DomainCheck.js";
import { checkDomain } from "../utils/domainChecker.js";
import { calculateScore } from "../utils/deliverabilityScore.js";

export const analyzeDomain = async (req, res) => {
try {
const { domain } = req.body;

const result = await checkDomain(domain);
const scoreData = calculateScore(result);

const finalData = {
  ...result,
  ...scoreData,
};

// ✅ SAVE TO DB (user-aware)
await DomainCheck.create({
  user: req.user?._id, // optional for public access
  domain,
  score: finalData.score,
  status: finalData.status,
  spf: !!result.spf?.length,
  dmarc: !!result.dmarc?.length,
});

res.json(finalData);

} catch (error) {
console.error("Domain analysis error:", error);
res.status(500).json({ message: "Error analyzing domain" });
}
};