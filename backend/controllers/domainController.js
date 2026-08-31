import DomainCheck from "../models/DomainCheck.js";
import { checkDomain } from "../utils/domainChecker.js";
import { calculateScore } from "../utils/deliverabilityScore.js";
import { generateRecommendations } from "../services/aiRecommendationService.js";

export const analyzeDomain = async (req, res) => {
  try {
    const { domain } = req.body;

    // Run domain analysis
    const result = await checkDomain(domain);

    // Calculate deliverability score
    const scoreData = calculateScore(result);

    // Combine analysis + score
    const finalData = {
      domain,
      ...result,
      ...scoreData,
    };

    // Generate AI assessment (currently simulated, later IBM watsonx)
    const aiAssessment = await generateRecommendations(finalData);

    // Save to database
    await DomainCheck.create({
      user: req.user?._id,
      domain,
      score: finalData.score,
      status: finalData.status,
      spf: !!result.spf?.length,
      dmarc: !!result.dmarc?.length,
    });

    // Return complete response
    res.json({
      ...finalData,
      aiAssessment,
    });

  } catch (error) {
    console.error("Domain analysis error:", error);

    res.status(500).json({
      message: "Error analyzing domain",
    });
  }
};