AI Email Deliverability Assistance

An AI-powered email deliverability analysis platform that helps users evaluate a domain's email authentication posture, identify deliverability risks, and receive practical remediation recommendations.

Problem

Poor email authentication and configuration can negatively affect inbox placement, sender reputation, and protection against phishing and spoofing.

Many businesses do not have a simple way to quickly inspect their domain's email authentication configuration and understand what needs to be improved.

Solution

AI Email Deliverability Assistance provides an automated domain analysis workflow.

A user enters a domain such as "google.com", and the application:

1. Checks the domain's DNS records.
2. Detects SPF configuration.
3. Detects DMARC configuration.
4. Evaluates DMARC policy strength.
5. Calculates a deliverability score.
6. Determines an overall status.
7. Generates AI-assisted recommendations.
8. Produces a professional email deliverability report.
9. Allows the report to be exported as a PDF.

Key Features

Domain Analysis

Users can enter a domain and receive an automated deliverability assessment.

SPF Detection

The system checks DNS TXT records for SPF configuration and identifies whether SPF is present.

DMARC Detection

The system checks for DMARC records and evaluates the configured policy.

Deliverability Scoring

The application calculates a score based on email authentication configuration, including SPF and DMARC.

Example:

- SPF configured
- DMARC configured
- Strong DMARC policy
- Higher overall deliverability score

Domains with missing authentication records receive lower scores and higher-risk classifications.

AI Recommendations

Google Gemini is used to generate practical recommendations based on the domain assessment.

The AI considers:

- SPF configuration
- DMARC policy
- Email authentication
- Sender reputation
- Inbox placement
- Monitoring
- Business impact
- Remediation steps

Professional Reports

The application generates a professional report containing:

- Deliverability score
- Overall status
- SPF information
- DMARC information
- Reputation assessment
- Executive summary
- Risk analysis
- Business impact
- Priority fixes
- AI remediation plan

PDF Export

Users can export the completed deliverability report as a PDF for documentation or sharing.

AI Approach

The application combines deterministic domain analysis with AI-generated recommendations.

Step 1 — DNS Analysis

The backend uses DNS TXT lookups to inspect the domain's authentication records.

Step 2 — Rule-Based Scoring

The system evaluates the discovered SPF and DMARC records and calculates a deliverability score.

Step 3 — AI Analysis

The resulting domain assessment is passed to Google Gemini.

Gemini generates structured recommendations covering the domain's authentication posture, risks, business impact, and remediation plan.

Step 4 — Report Generation

The assessment and AI recommendations are presented through the React frontend and can be exported as a professional PDF report.

Architecture

User
  |
  v
React Frontend
  |
  v
Express API
  |
  +----------------------+
  | |
  v v
DNS Analysis Gemini AI
  | |
  v v
SPF / DMARC AI Recommendations
  | |
  +----------+-----------+
             |
             v
      Deliverability Score
             |
             v
       Professional Report
             |
             v
          PDF Export

Technology Stack

Frontend

- React
- Vite
- Axios
- React Router
- Tailwind CSS

Backend

- Node.js
- Express
- MongoDB
- DNS resolution
- Google Gemini API

AI

- Google Gemini
- Structured JSON AI responses
- AI-generated deliverability recommendations

Example Result

For a domain with strong authentication configuration, the application can produce a result such as:

Deliverability Score: 100/100
Status: Good

SPF: Detected
DMARC: Configured
Reputation: Excellent

The system then provides AI recommendations such as continuing to monitor sender reputation, reviewing DNS authentication configuration, and monitoring DMARC reports.

Why This Matters

Email remains an important communication channel for businesses.

Strong authentication helps organizations:

- Improve email trust
- Reduce spoofing and phishing risks
- Support better inbox placement
- Protect sender reputation
- Identify configuration problems earlier

The platform turns technical DNS information into understandable business-oriented recommendations.

Challenge Theme

Wildcard Challenge — Build Intelligent Systems for the Future of Work

The project uses intelligent automation and decision support to help organizations evaluate email infrastructure and make better technical decisions without requiring users to manually inspect complex DNS records.

How IBM Bob Was Used

IBM Bob was used as an AI-assisted development partner throughout the project development workflow.

It supported activities including:

- Planning application features
- Debugging backend and frontend integration
- Reviewing implementation problems
- Assisting with API integration
- Testing application behavior
- Improving the application workflow
- Troubleshooting Gemini integration
- Refining the user interface and reporting experience

The project demonstrates how AI-assisted development can accelerate the process of building, testing, and refining a real-world software solution.

Project Structure

saas-growth-analytics-platform/
|
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── server.js
│ ├── testGemini.js
│ └── testScore.js
|
├── frontend/
│ └── src/
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── DomainChecker.jsx
│ │ ├── LandingPage.jsx
│ │ └── Reports.jsx
│ └── App.jsx
|
├── Screenshots/
├── .gitignore
├── package.json
└── README.md

Security

Environment variables and API credentials are excluded from version control.

Create local environment files for development and provide your own API credentials.

Never commit:

- Gemini API keys
- Auth0 secrets
- MongoDB credentials
- Other private environment variables

Status

The application currently provides a working end-to-end domain analysis workflow including:

- Domain input
- DNS analysis
- SPF detection
- DMARC detection
- Deliverability scoring
- AI recommendations
- Professional reports
- PDF export

Demo

A public demonstration video is provided as part of the AI Builders Challenge submission.

Future Improvements

Potential future improvements include:

- Historical domain monitoring
- Automated DMARC report ingestion
- Blacklist monitoring
- Advanced sender reputation analysis
- Scheduled deliverability audits
- Multi-domain monitoring
- User dashboards and historical reports
- Cloud deployment