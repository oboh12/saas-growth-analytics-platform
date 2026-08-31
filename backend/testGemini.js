import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

console.log(
  apiKey
    ? "✅ Gemini API key loaded"
    : "❌ Gemini API key missing"
);

console.log(`Testing model: ${model}`);

const ai = new GoogleGenAI({
  apiKey,
});

const analysis = {
  domain: "google.com",
  score: 100,
  status: "Good",
  spf: "v=spf1 include:_spf.google.com ~all",
  dmarc: "v=DMARC1; p=reject; rua=mailto:mailauth-reports@google.com",
  reputation: "Unknown",
};

const prompt = `
You are an expert Email Deliverability Consultant.

Analyze the following domain deliverability assessment.

Domain:
${analysis.domain}

Deliverability Score:
${analysis.score}

Status:
${analysis.status}

SPF:
${analysis.spf ? analysis.spf : "Missing"}

DMARC:
${analysis.dmarc ? analysis.dmarc : "Missing"}

Domain Reputation:
${analysis.reputation || "Unknown"}

Provide practical, accurate recommendations for improving
email authentication and deliverability.

Consider:
- SPF configuration
- DMARC policy
- Email authentication
- Sender reputation
- Inbox placement
- Monitoring
- Business impact
- Recommended remediation steps

Return the recommendation using the requested JSON structure.
`;

try {
  console.log("Sending structured Gemini request...");

  const response = await ai.models.generateContent({
    model,
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

  console.log("✅ Structured Gemini request succeeded");
  console.log("Raw Gemini response:");
  console.log(response.text);
} catch (error) {
  console.error("❌ Structured Gemini request failed");
  console.error("Message:", error?.message || error);
  console.error("Name:", error?.name);
  console.error("Cause:", error?.cause);
  console.error("Stack:", error?.stack);
}