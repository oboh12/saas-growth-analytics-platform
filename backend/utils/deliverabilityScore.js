/*
==========================================================
EMAIL DELIVERABILITY SCORE
==========================================================

Calculates a deliverability score based on:

1. SPF presence
2. DMARC presence
3. DMARC policy strength

IMPORTANT:
This function keeps the existing public interface:

calculateScore({ spf, dmarc })

and returns:

{
  score,
  status
}

This means domainController.js does not need to change.
==========================================================
*/

export const calculateScore = ({ spf, dmarc }) => {
  /*
  ========================================================
  DETERMINE WHETHER SPF AND DMARC EXIST
  ========================================================
  */

  const hasSPF =
    typeof spf === "string" &&
    spf.trim().toLowerCase().startsWith("v=spf1");

  const hasDMARC =
    typeof dmarc === "string" &&
    dmarc.trim().toLowerCase().startsWith("v=dmarc1");

  /*
  ========================================================
  START WITH BASE SCORE
  ========================================================

  A domain with both SPF and DMARC properly configured
  starts at 100.

  Missing SPF: -40
  Missing DMARC: -40

  This preserves the scoring behavior of the previous
  version for domains where records are simply present
  or missing.
  ========================================================
  */

  let score = 100;

  if (!hasSPF) {
    score -= 40;
  }

  if (!hasDMARC) {
    score -= 40;
  }

  /*
  ========================================================
  EVALUATE DMARC POLICY STRENGTH
  ========================================================

  DMARC can use:

  p=none
  p=quarantine
  p=reject

  These represent increasing levels of enforcement.

  p=none:
  Monitoring only.

  p=quarantine:
  Requests receiving servers to treat failures
  as suspicious/spam.

  p=reject:
  Strongest enforcement policy.
  ========================================================
  */

  if (hasDMARC) {
    const normalizedDMARC = dmarc.toLowerCase();

    const policyMatch = normalizedDMARC.match(
      /(?:^|;)\s*p\s*=\s*(none|quarantine|reject)(?:\s*;|$)/
    );

    const policy = policyMatch
      ? policyMatch[1]
      : null;

    /*
    ------------------------------------------------------
    DMARC POLICY SCORING
    ------------------------------------------------------

    p=reject:
      Strongest configuration.
      No deduction.

    p=quarantine:
      Good enforcement.
      Small deduction.

    p=none:
      Monitoring only.
      Larger deduction.

    Missing/invalid policy:
      DMARC exists but does not contain a valid
      enforcement policy.
    ------------------------------------------------------
    */

    if (policy === "none") {
      score -= 20;
    } else if (policy === "quarantine") {
      score -= 10;
    } else if (policy === "reject") {
      // Strongest DMARC policy. No deduction.
    } else {
      // DMARC record exists but has no valid p= policy.
      score -= 20;
    }
  }

  /*
  ========================================================
  PROTECT SCORE RANGE
  ========================================================
  */

  score = Math.max(0, Math.min(100, score));

  /*
  ========================================================
  DETERMINE STATUS
  ========================================================
  */

  let status = "Good";

  if (score < 60) {
    status = "High Risk";
  } else if (score < 80) {
    status = "Moderate Risk";
  }

  /*
  ========================================================
  RETURN RESULT
  ========================================================

  IMPORTANT:
  Only score and status are returned.

  This preserves compatibility with:

  const scoreData = calculateScore(result);

  and:

  const finalData = {
    domain,
    ...result,
    ...scoreData,
  };
  ========================================================
  */

  return {
    score,
    status,
  };
};