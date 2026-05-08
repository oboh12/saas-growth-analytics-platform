# 📊 Full-Stack Marketing Analytics & Experimentation Platform

A business-focused analytics engine built with Node.js, Express, MongoDB, and React.

This project simulates real-world SaaS analytics workflows including:

• Campaign KPI modeling  
• A/B test experimentation with statistical validation  
• Cohort retention analysis  
• Time-series revenue trends  
• NLP-based sentiment analysis  
• BI-ready CSV exports  

---

# 🚀 Core Capabilities

## 1️⃣ Campaign KPI Modeling

Derived Metrics:
- Open Rate
- Click-Through Rate (CTR)
- Conversion Rate
- Unsubscribe Rate
- Weighted Engagement Score

Engagement Score Formula:
```
(0.3 × Open Rate) +
(0.3 × CTR) +
(0.3 × Conversion Rate) -
(0.1 × Unsubscribe Rate)
```

---

## 2️⃣ A/B Test Simulation + Statistical Significance

Implemented:
- Two-proportion Z-test
- 95% confidence threshold (|z| > 1.96)
- Winner detection logic

This simulates real marketing experiment validation workflows.

---

## 3️⃣ Cohort Retention Analysis

Calculates:
- Month 2 Retention %
- Month 3 Retention %
- Signup cohort grouping

Used to measure user lifecycle performance.

---

## 4️⃣ Time-Series Revenue Trend Analysis

- Month-over-month growth calculation
- Revenue trend modeling
- Growth rate %

---

## 5️⃣ Text Analytics & NLP

- Sentiment analysis (score + comparative)
- Word frequency extraction
- Summary compression ratio

---

## 6️⃣ SQL Warehouse Readiness

BigQuery-style queries included for:

- KPI calculation
- Cohort retention
- A/B test dataset preparation

---

## 7️⃣ BI Tool Integration

- CSV export endpoint
- Compatible with:
  - Tableau
  - Power BI
  - Looker Studio

---

# 🧠 Technologies Used

Backend:
- Node.js
- Express
- MongoDB
- JSON2CSV

Frontend:
- React
- Recharts
- Tailwind CSS

Analytics Concepts:
- KPI Engineering
- Funnel Metrics
- A/B Testing
- Z-Test Statistical Validation
- Cohort Retention Modeling
- Time-Series Analysis
- NLP Sentiment Scoring

---

# 📸 Validation Evidence

Screenshots Included:
- KPI Dashboard
- A/B Test Results + Z-Score
- Cohort Retention Output
- Time-Series Growth Chart
- API JSON Responses
- CSV Export Download
- MongoDB Raw Data

---

# 🎯 Positioning

This project demonstrates business-aware data engineering capability suitable for:

• SaaS Marketing Analytics  
• Growth & Experimentation Teams  
• Email Campaign Performance Analysis  
• Product Analytics  

Built to simulate real-world Data Analyst workflows within a modern full-stack architecture.

## 📸 Application Screenshots

![Server Running](screenshots/Server-running.png)
![API JSON Response](screenshots/API-JSON-response.png)
![CSV Export](screenshots/CSV-export-file.png)