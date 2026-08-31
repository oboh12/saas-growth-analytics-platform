import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

/*
==========================================================
INITIALIZE GOOGLE GENAI
==========================================================
*/

const apiKey = process.env.GEMINI_API_KEY;

console.log(
  apiKey
    ? "✅ AI Service API key loaded"
    : "❌ AI Service API key missing"
);

// Allow the model to be changed through .env without changing
// this service.
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.6-flash";

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

/*
==========================================================
EXTRACT DMARC POLICY
==========================================================
*/

/**
 * Extracts the DMARC policy from a DMARC record.
 *
 * Examples:
 *
 * v=DMARC1; p=none
 * -> none
 *
 * v=DMARC1; p=quarantine
 * -> quarantine
 *
 * v=DMARC1; p=reject
 * -> reject
 */
function extractDMARCPolicy(dmarc) {
  if (typeof dmarc !== "string") {
    return null;
  }

  const match = dmarc
    .toLowerCase()
    .match(
      /(?:^|;)\s*p\s*=\s*(none|quarantine|reject)(?:\s*;|$)/
    );

  return match ? match[1] : null;
}

/*
==========================================================
DESCRIBE DMARC POLICY STRENGTH
==========================================================
*/

function describeDMARCPolicy(policy) {
  switch (policy) {
    case "reject":
      return "Strongest enforcement. Unauthorized messages should be rejected.";

    case "quarantine":
      return "Moderate enforcement. Unauthorized messages should generally be treated as suspicious or spam.";

    case "none":
      return "Monitoring-only policy. DMARC reports can be collected, but unauthorized messages are not requested to be blocked.";

    default:
      return "Unknown or invalid DMARC policy.";
  }
}

/*
==========================================================
RULE-BASED FALLBACK
==========================================================
*/

/**
 * Generates reliable recommendations without an external
 * AI provider.
 *
 * This fallback ensures the application remains useful if
 * Gemini is unavailable, misconfigured, or fails.
 */
function generateRuleBasedRecommendations(analysis) {
  const {
    score,
    spf,
    dmarc,
  } = analysis;

  const dmarcPolicy = extractDMARCPolicy(dmarc);

  let executiveSummary = "";
  let riskAnalysis = "";
  let businessImpact = "";

  const priorityFixes = [];
  const remediationPlan = [];

  /*
  --------------------------------------------------------
  EXECUTIVE SUMMARY
  --------------------------------------------------------
  */

  if (score >= 90) {
    executiveSummary =
      "This domain demonstrates a strong email authentication posture with a high probability of successful inbox delivery.";
  } else if (score >= 70) {
    executiveSummary =
      "This domain has a moderate deliverability posture but requires improvements before production deployment.";
  } else {
    executiveSummary =
      "This domain currently presents significant deliverability risks requiring immediate attention.";
  }

  /*
  --------------------------------------------------------
  RISK ANALYSIS
  --------------------------------------------------------
  */

  if (!spf && !dmarc) {
    riskAnalysis =
      "Both SPF and DMARC are missing, significantly increasing spoofing and phishing risks.";
  } else if (!spf) {
    riskAnalysis =
      "SPF is missing. Receiving mail servers cannot verify authorized senders.";
  } else if (!dmarc) {
    riskAnalysis =
      "DMARC is missing. Domain spoofing protection remains incomplete.";
  } else if (dmarcPolicy === "none") {
    riskAnalysis =
      "SPF and DMARC are configured, but the DMARC policy is set to p=none, which provides monitoring without enforcement against unauthorized messages.";
  } else if (dmarcPolicy === "quarantine") {
    riskAnalysis =
      "SPF and DMARC are configured, with DMARC using p=quarantine. This provides meaningful enforcement but is not the strongest available policy.";
  } else if (dmarcPolicy === "reject") {
    riskAnalysis =
      "SPF and DMARC are configured, with DMARC using the strongest p=reject enforcement policy.";
  } else {
    riskAnalysis =
      "SPF and DMARC records are present, but the DMARC policy could not be reliably identified.";
  }

  /*
  --------------------------------------------------------
  BUSINESS IMPACT
  --------------------------------------------------------
  */

  if (score >= 90) {
    businessImpact =
      "Marketing campaigns and transactional emails are likely to benefit from strong authentication and sender trust, although ongoing reputation monitoring remains important.";
  } else if (score >= 70) {
    businessImpact =
      "Some campaigns may experience inconsistent inbox placement and reduced engagement until authentication policies are strengthened.";
  } else {
    businessImpact =
      "Business emails face increased spam filtering, lower engagement, spoofing exposure, and potential sender reputation damage.";
  }

  /*
  --------------------------------------------------------
  PRIORITY FIXES
  --------------------------------------------------------
  */

  if (!spf) {
    priorityFixes.push(
      "Publish a valid SPF record authorizing all legitimate outbound mail servers and email providers."
    );
  }

  if (!dmarc) {
    priorityFixes.push(
      "Publish a DMARC record beginning with p=none, monitor authentication reports, and progressively strengthen the policy after validating legitimate senders."
    );
  }

  if (dmarcPolicy === "none") {
    priorityFixes.push(
      "Review DMARC reports and consider progressing from p=none to p=quarantine or p=reject after confirming that legitimate senders pass authentication."
    );
  }

  if (dmarcPolicy === "quarantine") {
    priorityFixes.push(
      "Continue monitoring DMARC reports and consider progressing to p=reject once legitimate email sources are verified."
    );
  }

  if (dmarcPolicy === null && dmarc) {
    priorityFixes.push(
      "Review the DMARC record and ensure it contains a valid p=none, p=quarantine, or p=reject policy."
    );
  }

  if (score < 80) {
    priorityFixes.push(
      "Review DNS configuration and strengthen overall email authentication."
    );
  }

  if (priorityFixes.length === 0) {
    priorityFixes.push(
      "Continue monitoring authentication records and sender reputation."
    );
  }

  /*
  --------------------------------------------------------
  REMEDIATION PLAN
  --------------------------------------------------------
  */

  remediationPlan.push(
    "Verify DNS propagation after every configuration change."
  );

  remediationPlan.push(
    "Monitor DMARC authentication reports and investigate unauthorized senders."
  );

  remediationPlan.push(
    "Monitor inbox placement following authentication updates."
  );

  remediationPlan.push(
    "Perform regular deliverability audits."
  );

  /*
  --------------------------------------------------------
  RETURN FALLBACK RESPONSE
  --------------------------------------------------------
  */

  return {
    executiveSummary,
    riskAnalysis,
    businessImpact,
    priorityFixes,
    remediationPlan,
    generatedBy: "Rule Engine",
  };
}

/*
==========================================================
VALIDATE AI RESPONSE
==========================================================
*/

function validateAIResponse(response) {
  if (!response || typeof response !== "object") {
    throw new Error("AI response is not a valid object.");
  }

  if (typeof response.executiveSummary !== "string") {
    throw new Error(
      "AI response has an invalid executiveSummary."
    );
  }

  if (typeof response.riskAnalysis !== "string") {
    throw new Error(
      "AI response has an invalid riskAnalysis."
    );
  }

  if (typeof response.businessImpact !== "string") {
    throw new Error(
      "AI response has an invalid businessImpact."
    );
  }

  if (!Array.isArray(response.priorityFixes)) {
    throw new Error(
      "AI response has an invalid priorityFixes array."
    );
  }

  if (!Array.isArray(response.remediationPlan)) {
    throw new Error(
      "AI response has an invalid remediationPlan array."
    );
  }

  return {
    executiveSummary: response.executiveSummary.trim(),

    riskAnalysis: response.riskAnalysis.trim(),

    businessImpact: response.businessImpact.trim(),

    priorityFixes: response.priorityFixes
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean),

    remediationPlan: response.remediationPlan
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

/*
==========================================================
GEMINI AI SERVICE
==========================================================
*/

/**
 * Generates AI-powered email deliverability recommendations.
 *
 * IMPORTANT:
 * The public application interface remains:
 *
 * generateRecommendations(analysis)
 *
 * Existing controllers do not need to change.
 */
export async function generateGeminiRecommendations(
  analysis
) {
  try {
    /*
    ------------------------------------------------------
    VERIFY AI CONFIGURATION
    ------------------------------------------------------
    */

    if (!ai) {
      throw new Error(
        "Gemini API key not configured."
      );
    }

    /*
    ------------------------------------------------------
    EXTRACT DMARC POLICY
    ------------------------------------------------------
    */

    const dmarcPolicy = extractDMARCPolicy(
      analysis.dmarc
    );

    const dmarcPolicyDescription =
      describeDMARCPolicy(dmarcPolicy);

    /*
    ------------------------------------------------------
    BUILD ANALYSIS CONTEXT
    ------------------------------------------------------
    */

    const prompt = `
You are an expert Email Deliverability Consultant.

Analyze the following domain deliverability assessment.

========================================================
DOMAIN
========================================================

${analysis.domain}

========================================================
DELIVERABILITY SCORE
========================================================

Score:
${analysis.score}/100

Status:
${analysis.status}

========================================================
SPF ANALYSIS
========================================================

SPF configured:
${analysis.spf ? "Yes" : "No"}

Actual SPF record:
${analysis.spf || "No SPF record detected."}

========================================================
DMARC ANALYSIS
========================================================

DMARC configured:
${analysis.dmarc ? "Yes" : "No"}

Actual DMARC record:
${analysis.dmarc || "No DMARC record detected."}

DMARC policy:
${dmarcPolicy || "Unknown / not detected"}

DMARC policy strength:
${dmarcPolicyDescription}

========================================================
DOMAIN REPUTATION
========================================================

${analysis.reputation || "Unknown"}

========================================================
ANALYSIS REQUIREMENTS
========================================================

Analyze the actual SPF and DMARC records provided above.

Do NOT assume that a record is strong merely because it
exists.

For SPF:
- Determine whether SPF is present.
- Consider the actual SPF policy.
- Identify obvious configuration concerns when they can
  be determined from the record.
- Do not invent DNS information that is not provided.

For DMARC:
- Determine whether DMARC is present.
- Evaluate the actual p= policy.
- Distinguish between p=none, p=quarantine, and p=reject.
- Consider reporting configuration when visible.
- Do not claim that a policy is stronger or weaker than
  the supplied record supports.

For the overall assessment:
- Explain the principal deliverability risks.
- Explain potential business impact.
- Recommend practical remediation steps.
- Prioritize the most important fixes first.
- Base recommendations on the supplied DNS information.
- Do not invent mail providers, IP addresses, DNS records,
  or reputation information.

Return the recommendation using exactly the requested
JSON structure.
`;

    /*
    ------------------------------------------------------
    CALL GOOGLE GEMINI
    ------------------------------------------------------
    */

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            executiveSummary: {
              type: "string",
            },

            riskAnalysis: {
              type: "string",
            },

            businessImpact: {
              type: "string",
            },

            priorityFixes: {
              type: "array",
              items: {
                type: "string",
              },
            },

            remediationPlan: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "executiveSummary",
            "riskAnalysis",
            "businessImpact",
            "priorityFixes",
            "remediationPlan",
          ],
        },
      },
    });

    /*
    ------------------------------------------------------
    EXTRACT AI RESPONSE
    ------------------------------------------------------
    */

    let text = response.text;

    if (!text || typeof text !== "string") {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    text = text.trim();

    /*
    ------------------------------------------------------
    REMOVE ACCIDENTAL MARKDOWN FENCES
    ------------------------------------------------------
    */

    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    /*
    ------------------------------------------------------
    PARSE JSON
    ------------------------------------------------------
    */

    let aiResponse;

    try {
      aiResponse = JSON.parse(text);
    } catch (parseError) {
      throw new Error(
        `Gemini returned invalid JSON: ${parseError.message}`
      );
    }

    /*
    ------------------------------------------------------
    VALIDATE RESPONSE STRUCTURE
    ------------------------------------------------------
    */

    const validatedResponse =
      validateAIResponse(aiResponse);

    /*
    ------------------------------------------------------
    RETURN AI RECOMMENDATIONS
    ------------------------------------------------------
    */

    return {
      ...validatedResponse,
      generatedBy: "Google Gemini",
    };
  } catch (error) {
    /*
    ------------------------------------------------------
    RELIABLE FALLBACK
    ------------------------------------------------------

    If Gemini fails for ANY reason, the application
    remains functional and returns rule-based
    recommendations.
    ------------------------------------------------------
    */

    console.error(
      "Gemini failed. Falling back to rule engine."
    );

    console.error(
      error?.message || error
    );

    return generateRuleBasedRecommendations(
      analysis
    );
  }
}

/*
==========================================================
PUBLIC EXPORT
==========================================================
*/

/**
 * Main recommendation interface used by the application.
 *
 * KEEP THIS FUNCTION NAME UNCHANGED.
 *
 * Existing controllers can continue using:
 *
 * generateRecommendations(analysis)
 */
export async function generateRecommendations(
  analysis
) {
  return generateGeminiRecommendations(analysis);
}
