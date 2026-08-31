import { Link } from "react-router-dom";

export default function Dashboard() {
  // Placeholder statistics (replace with API data later)
  const stats = [
    {
      title: "Domains Checked",
      value: "12",
    },
    {
      title: "Average Score",
      value: "89%",
    },
    {
      title: "Healthy Domains",
      value: "9",
    },
    {
      title: "Reports Generated",
      value: "12",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===========================
          Header
      ============================ */}

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              AI Email Deliverability Assistant
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back! Monitor your domains and improve email deliverability.
            </p>
          </div>

          <Link
            to="/"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Home
          </Link>

        </div>
      </header>

      {/* ===========================
          Quick Statistics
      ============================ */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <h3 className="text-gray-500 text-sm">
                {item.title}
              </h3>

              <p className="text-3xl font-bold text-indigo-700 mt-3">
                {item.value}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* ===========================
          Quick Actions
      ============================ */}

      <section className="max-w-7xl mx-auto px-6">

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Analyze Domain */}

          <Link
            to="/domain-checker"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">
              🌐
            </div>

            <h3 className="text-xl font-bold mb-2">
              Analyze Domain
            </h3>

            <p className="text-gray-600">
              Check SPF, DMARC, and email deliverability for any domain.
            </p>
          </Link>

          {/* Reports (Temporary Route) */}

          <Link
            to="/analytics"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">
              📄
            </div>

            <h3 className="text-xl font-bold mb-2">
              View Reports
            </h3>

            <p className="text-gray-600">
              Access previous AI deliverability reports.
            </p>
          </Link>

          {/* History (Temporary Route) */}

          <Link
            to="/analytics"
            className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">
              📈
            </div>

            <h3 className="text-xl font-bold mb-2">
              History
            </h3>

            <p className="text-gray-600">
              Review your most recent domain analyses.
            </p>
          </Link>

        </div>

      </section>

      {/* ===========================
          Recent Activity
      ============================ */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="bg-white rounded-xl shadow p-8">

          <h2 className="text-2xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="border rounded-lg p-6 bg-gray-50">

            <p className="text-gray-700 font-medium">
              No recent analyses yet.
            </p>

            <p className="text-gray-500 mt-2">
              Analyze your first domain to begin building your report history.
            </p>

          </div>

        </div>

      </section>

      {/* ===========================
          AI Insights Preview
      ============================ */}

      <section className="max-w-7xl mx-auto px-6 pb-12">

        <div className="bg-indigo-700 rounded-xl text-white p-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Insights (Coming Soon)
          </h2>

          <p className="leading-7">
            Future versions of AI Email Deliverability Assistant will provide
            intelligent recommendations based on SPF configuration, DMARC
            policies, domain reputation, blacklist monitoring, and historical
            trends to help improve email deliverability.
          </p>

        </div>

      </section>

    </div>
  );
}