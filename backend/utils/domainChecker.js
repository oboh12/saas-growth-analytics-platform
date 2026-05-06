import dns from "dns/promises";

export const checkDomain = async (domain) => {
  let spf = null;
  let dmarc = null;

  try {
    spf = await dns.resolveTxt(domain);
  } catch {}

  try {
    dmarc = await dns.resolveTxt(`_dmarc.${domain}`);
  } catch {}

  return { spf, dmarc };
};