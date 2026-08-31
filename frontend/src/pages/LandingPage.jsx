import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* =========================
          Navigation Bar
      ========================== */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <h1 className="text-2xl font-bold text-indigo-700">
            AI Email Deliverability Assistant
          </h1>

          <nav className="flex items-center gap-6">

            <a
              href="#features"
              className="hover:text-indigo-600 font-medium"
            >
              Features
            </a>

            <a
              href="#reports"
              className="hover:text-indigo-600 font-medium"
            >
              Reports
            </a>

            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Login
            </Link>

          </nav>

        </div>
      </header>

      {/* =========================
          Hero Section
      ========================== */}

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">

          AI Email Deliverability Assistant

        </h2>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">

          Monitor email authentication, analyze domain health, and receive
          intelligent recommendations to improve your email deliverability
          before your emails reach customers.

        </p>

        <div className="mt-10 flex justify-center gap-5">

          <Link
            to="/domain-checker"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
          >
            Try Free
          </Link>

          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 font-semibold"
          >
            Login
          </Link>

        </div>

      </section>

      {/* =========================
          Features Section
      ========================== */}

      <section
        id="features"
        className="bg-white py-20"
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">

            Powerful Deliverability Features

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-gray-50 rounded-xl shadow-md p-6">

              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                Domain Health Analysis
              </h3>

              <p>
                Analyze your domain configuration and detect authentication
                issues affecting email delivery.
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-6">

              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                SPF Validation
              </h3>

              <p>
                Verify Sender Policy Framework records to reduce spoofing and
                improve inbox placement.
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-6">

              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                DMARC Verification
              </h3>

              <p>
                Check DMARC policies and strengthen your email security against
                phishing attacks.
              </p>

            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-6">

              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                AI Deliverability Insights
              </h3>

              <p>
                Receive intelligent recommendations to improve domain
                reputation and email performance.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          How It Works
      ========================== */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-12">

            How It Works

          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white shadow rounded-xl p-8">

              <div className="text-5xl mb-4">
                🌐
              </div>

              <h3 className="text-2xl font-semibold mb-3">

                Enter Domain

              </h3>

              <p>

                Input the domain you want to analyze.

              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-8">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h3 className="text-2xl font-semibold mb-3">

                Analyze Configuration

              </h3>

              <p>

                Our engine evaluates authentication and deliverability signals.

              </p>

            </div>

            <div className="bg-white shadow rounded-xl p-8">

              <div className="text-5xl mb-4">
                📊
              </div>

              <h3 className="text-2xl font-semibold mb-3">

                Receive AI Report

              </h3>

              <p>

                Get a comprehensive deliverability score and actionable
                recommendations.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          Call To Action
      ========================== */}

      <section
        id="reports"
        className="bg-indigo-700 text-white py-20"
      >

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-6">

            Ready to Improve Your Email Deliverability?

          </h2>

          <p className="text-lg mb-10">

            Start analyzing your domains today and receive AI-powered
            deliverability insights in seconds.

          </p>

          <Link
            to="/domain-checker"
            className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100"
          >
            Analyze Your Domain
          </Link>

        </div>

      </section>

      {/* =========================
          Footer
      ========================== */}

      <footer className="bg-gray-900 text-gray-300 py-8">

        <div className="max-w-7xl mx-auto text-center px-6">

          <h3 className="text-xl font-bold text-white mb-3">

            AI Email Deliverability Assistant

          </h3>

          <p>

            Built with React, Node.js, Express, MongoDB, Tailwind CSS, and AI.

          </p>

          <p className="mt-4 text-sm">

            © 2026 AI Email Deliverability Assistant. All rights reserved.

          </p>

        </div>

      </footer>

    </div>
  );
}