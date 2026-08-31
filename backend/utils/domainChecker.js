import dns from "dns/promises";

/*
==========================================================
DNS DOMAIN CHECKER
==========================================================
Queries DNS TXT records and extracts only the records
relevant to email deliverability.
==========================================================
*/

export const checkDomain = async (domain) => {
  let txtRecords = [];
  let spf = null;
  let dmarc = null;

  /*
  ========================================================
  QUERY ROOT DOMAIN TXT RECORDS
  ========================================================
  */
  try {
    txtRecords = await dns.resolveTxt(domain);
  } catch (error) {
    console.error(`DNS TXT lookup failed for ${domain}:`, error.message);
  }

  /*
  ========================================================
  EXTRACT SPF RECORD
  ========================================================
  dns.resolveTxt() returns TXT records as nested arrays.

  Example:
  [
    ["google-site-verification=..."],
    ["v=spf1 include:_spf.google.com ~all"],
    ["facebook-domain-verification=..."]
  ]

  We only want the record beginning with "v=spf1".
  ========================================================
  */

  const flattenedTxtRecords = txtRecords.flat();

  spf =
    flattenedTxtRecords.find((record) =>
      record.trim().toLowerCase().startsWith("v=spf1")
    ) || null;

  /*
  ========================================================
  QUERY DMARC RECORD
  ========================================================
  DMARC is stored under:

  _dmarc.example.com
  ========================================================
  */

  try {
    const dmarcRecords = await dns.resolveTxt(`_dmarc.${domain}`);

    const flattenedDmarcRecords = dmarcRecords.flat();

    dmarc =
      flattenedDmarcRecords.find((record) =>
        record.trim().toLowerCase().startsWith("v=dmarc1")
      ) || null;
  } catch (error) {
    console.error(
      `DMARC lookup failed for ${domain}:`,
      error.message
    );
  }

  /*
  ========================================================
  RETURN CLEAN DELIVERABILITY DATA
  ========================================================
  */

  return {
    spf,
    dmarc,
  };
};