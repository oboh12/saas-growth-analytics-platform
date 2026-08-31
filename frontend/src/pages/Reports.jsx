import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reports() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-3xl font-bold mb-4">
            No Report Available
          </h2>

          <p className="text-gray-600 mb-6">
            Please analyze a domain first.
          </p>

          <button
            onClick={() => navigate("/domain-checker")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Domain Checker
          </button>
        </div>
      </div>
    );
  }

  const {
    domain,
    score,
    status,
    spf,
    dmarc,
    reputation,
    aiAssessment,
  } = state;

  const {
    executiveSummary,
    riskAnalysis,
    businessImpact,
    priorityFixes,
    remediationPlan,
    generatedBy,
  } = aiAssessment || {};

  /*
  ==========================================================
  PDF EXPORT
  ==========================================================
  */

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Email Deliverability Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Domain: ${domain}`, 20, 35);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 42);

    autoTable(doc, {
      startY: 55,
      head: [["Metric", "Result"]],
      body: [
        ["Deliverability Score", `${score}/100`],
        ["Status", status],
        ["SPF Record", spf ? "Detected" : "Missing"],
        ["DMARC Record", dmarc ? "Detected" : "Missing"],
        ["Domain Reputation", reputation || "Unknown"],
      ],
    });

    let y = doc.lastAutoTable.finalY + 15;

    const addSection = (title, text) => {
      if (!text) return;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(15);
      doc.text(title, 20, y);
      y += 8;

      doc.setFontSize(10);

      const lines = doc.splitTextToSize(text, 170);
      doc.text(lines, 20, y);

      y += lines.length * 5 + 8;
    };

    addSection("Executive Summary", executiveSummary);
    addSection("Risk Analysis", riskAnalysis);
    addSection("Business Impact", businessImpact);

    if (Array.isArray(priorityFixes) && priorityFixes.length > 0) {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(15);
      doc.text("Priority Fixes", 20, y);
      y += 8;

      doc.setFontSize(10);

      priorityFixes.forEach((fix, index) => {
        const lines = doc.splitTextToSize(
          `${index + 1}. ${fix}`,
          170
        );

        if (y + lines.length * 5 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, 20, y);
        y += lines.length * 5 + 4;
      });
    }

    if (
      Array.isArray(remediationPlan) &&
      remediationPlan.length > 0
    ) {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(15);
      doc.text("Remediation Plan", 20, y);
      y += 8;

      doc.setFontSize(10);

      remediationPlan.forEach((step, index) => {
        const lines = doc.splitTextToSize(
          `${index + 1}. ${step}`,
          170
        );

        if (y + lines.length * 5 > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(lines, 20, y);
        y += lines.length * 5 + 4;
      });
    }

    doc.save(`${domain}-deliverability-report.pdf`);
  };

  /*
  ==========================================================
  PAGE
  ==========================================================
  */

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Email Deliverability Report
            </h1>

            <p className="text-gray-600 mt-2">
              Analysis for <strong>{domain}</strong>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/domain-checker")}
              className="border border-gray-300 bg-white px-5 py-3 rounded-lg"
            >
              Analyze Another Domain
            </button>

            <button
              onClick={exportPDF}
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* SCORE */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Deliverability Score
            </p>

            <p className="text-5xl font-bold mt-2">
              {score}
              <span className="text-xl text-gray-400">
                /100
              </span>
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              Status
            </p>

            <p className="text-3xl font-bold mt-2">
              {status}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
              AI Engine
            </p>

            <p className="text-xl font-bold mt-3">
              {generatedBy || "Rule Engine"}
            </p>
          </div>

        </div>

        {/* DNS SUMMARY */}

        <div className="bg-white rounded-xl shadow p-6 mb-10">

          <h2 className="text-2xl font-bold mb-5">
            DNS Authentication
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">
                SPF
              </h3>

              <p className="text-gray-700">
                {spf || "Missing"}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">
                DMARC
              </h3>

              <p className="text-gray-700 break-words">
                {dmarc || "Missing"}
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <h3 className="font-semibold mb-2">
                Reputation
              </h3>

              <p className="text-gray-700">
                {reputation || "Unknown"}
              </p>
            </div>

          </div>
        </div>

        {/* EXECUTIVE SUMMARY */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Executive Summary
          </h2>

          <div className="bg-white border rounded-xl p-6 leading-8">
            {executiveSummary ? (
              <p className="text-gray-700">
                {executiveSummary}
              </p>
            ) : (
              <>
                <p className="text-gray-700">
                  This report evaluates the email deliverability
                  posture of <strong>{domain}</strong>.
                </p>

                <p className="mt-4 text-gray-700">
                  The overall deliverability score is{" "}
                  <strong>{score}/100</strong>, indicating a{" "}
                  <strong>{status}</strong> level of email health.
                </p>
              </>
            )}
          </div>
        </div>

        {/* RISK ANALYSIS */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Risk Analysis
          </h2>

          <div className="bg-white border rounded-xl p-6 leading-8">
            {riskAnalysis ? (
              <p className="text-gray-700">
                {riskAnalysis}
              </p>
            ) : (
              <div>
                <p>
                  SPF:{" "}
                  <strong>
                    {spf ? "Configured" : "Missing"}
                  </strong>
                </p>

                <p>
                  DMARC:{" "}
                  <strong>
                    {dmarc ? "Configured" : "Missing"}
                  </strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BUSINESS IMPACT */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Business Impact
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 leading-8">

            {businessImpact ? (
              <p className="text-gray-700">
                {businessImpact}
              </p>
            ) : (
              <ul className="space-y-3 text-gray-700">
                <li>
                  Higher email deliverability improves campaign
                  performance.
                </li>

                <li>
                  Better inbox placement can improve engagement.
                </li>

                <li>
                  Strong authentication reduces phishing and
                  spoofing risks.
                </li>

                <li>
                  Improved sender reputation strengthens customer
                  trust.
                </li>
              </ul>
            )}

          </div>
        </div>

        {/* PRIORITY FIXES */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Priority Fixes
          </h2>

          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">

            {Array.isArray(priorityFixes) &&
            priorityFixes.length > 0 ? (
              <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                {priorityFixes.map((fix, index) => (
                  <li key={index}>
                    {fix}
                  </li>
                ))}
              </ol>
            ) : (
              <p>
                Continue monitoring authentication records and
                sender reputation.
              </p>
            )}

          </div>
        </div>

        {/* REMEDIATION PLAN */}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            AI Remediation Plan
          </h2>

          <div className="bg-indigo-50 border border-indigo-300 rounded-xl p-6">

            {Array.isArray(remediationPlan) &&
            remediationPlan.length > 0 ? (
              <ol className="list-decimal ml-6 space-y-3 text-gray-700">
                {remediationPlan.map((step, index) => (
                  <li key={index}>
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-700">
                Review authentication configuration, monitor
                DMARC reports, and perform regular deliverability
                audits.
              </p>
            )}

          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-12 pb-10 text-center text-gray-500">
          AI Email Deliverability Assistance
        </div>

      </div>
    </div>
  );
}