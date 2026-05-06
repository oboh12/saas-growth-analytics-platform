export const calculateScore = ({ spf, dmarc }) => {
  let score = 100;

  if (!spf) score -= 40;
  if (!dmarc) score -= 40;

  let status = "Good";

  if (score < 60) status = "High Risk";
  else if (score < 80) status = "Moderate Risk";

  return { score, status };
};