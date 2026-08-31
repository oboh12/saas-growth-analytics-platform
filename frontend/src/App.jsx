import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import AnalyticsDashboard from "./pages/AnalyticsDashboard.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DomainChecker from "./pages/DomainChecker.jsx";
import Reports from "./pages/Reports.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Domain Checker */}
        <Route
          path="/domain-checker"
          element={<DomainChecker />}
        />

        {/* Professional Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Analytics Dashboard */}
        <Route
          path="/analytics"
          element={<AnalyticsDashboard />}
        />

        {/* Protected User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}