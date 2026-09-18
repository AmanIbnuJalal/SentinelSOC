# SentinelSOC

### Automated Threat Intelligence & Vulnerability Intelligence Dashboard

SentinelSOC is a cybersecurity dashboard prototype designed to help Security Operations Center (SOC) analysts **collect, organize, analyze, and visualize vulnerability and threat intelligence in one place**.

The prototype focuses on providing a centralized interface for viewing vulnerability information, prioritizing security risks, and supporting faster security analysis.

---

## 🎯 Project Objective

Modern Security Operations Centers receive large amounts of vulnerability and threat intelligence from different sources.

This information can be difficult to manage when it is scattered across multiple platforms.

**SentinelSOC aims to provide a centralized dashboard that can:**

* Collect security intelligence from multiple sources
* Organize vulnerability information
* Identify high-priority vulnerabilities
* Provide risk-related context
* Reduce information duplication
* Help analysts quickly understand security data
* Provide a single interface for security monitoring

---

## 🖥️ Current Prototype

The current version is an **MVP/prototype** consisting of a React-based frontend and a Python-based backend.

### Frontend

The frontend provides the main SOC dashboard interface.

Current interface components include:

* 📊 Security summary cards
* 🔎 Vulnerability search
* 🔽 Vulnerability filtering
* 📋 Vulnerability information table
* 🚨 Critical and High severity indicators
* 🛡️ KEV-related vulnerability information
* 📈 EPSS-related risk information
* 📱 Responsive dashboard interface

### Backend

The backend provides the foundation for the application's API and data-processing layer.

It is responsible for:

* API endpoints
* Database interaction
* Vulnerability data models
* Indicator data models
* Security intelligence processing
* Risk-related data handling

The backend is currently under active development as part of the prototype.

---

## 🏗️ System Architecture

```text
             Security Intelligence Sources
                        │
                        ▼
              ┌──────────────────┐
              │  Data Collection  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Data Processing   │
              │ & Normalization   │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Risk / Context   │
              │    Analysis      │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Backend API    │
              │     Python       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ React Frontend   │
              │  SOC Dashboard   │
              └──────────────────┘
```

---

## 📂 Project Structure

```text
prototype/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

The project structure may evolve as additional functionality is implemented.

---

## 🧰 Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy

### Database

* SQLite / relational database

### Development

* Git
* GitHub
* Visual Studio Code
* Linux

---

## 🔐 Security Intelligence

SentinelSOC is designed around cybersecurity intelligence concepts including:

### Vulnerability Intelligence

* CVE identification
* Severity classification
* CVSS information
* EPSS information
* Known Exploited Vulnerabilities (KEV)
* Vulnerability prioritization

### Threat Intelligence

The system is designed to work with indicators such as:

* IP addresses
* Domains
* URLs
* File hashes
* Threat intelligence sources

### Context Enrichment

Future processing can add contextual information to indicators, including:

* Geographic information
* Organization / ISP information
* Autonomous System information
* Source correlation
* Risk scores

---

## 📊 Dashboard

The SentinelSOC dashboard provides a centralized view of security information.

The summary section displays important security metrics such as:

```text
┌────────────────────┐ ┌────────────────────┐
│ Total              │ │ Critical / High    │
│ Vulnerabilities    │ │ Vulnerabilities    │
└────────────────────┘ └────────────────────┘

┌────────────────────┐ ┌────────────────────┐
│ KEV Listed         │ │ High EPSS          │
│ Vulnerabilities    │ │ Vulnerabilities    │
└────────────────────┘ └────────────────────┘
```

The vulnerability table allows analysts to search and filter security information.

---

## 🚀 Running the Prototype

### 1. Clone the Repository

```bash
git clone https://github.com/AmanIbnuJalal/SentinelSOC.git
cd SentinelSOC
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### 3. Run the Backend

Open another terminal:

```bash
cd backend
```

Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

> The exact backend startup command may change as development continues.

---

## 📌 Development Status

| Component                       | Status        |
| ------------------------------- | ------------- |
| Frontend Dashboard              | ✅ Prototype   |
| Dashboard Summary               | ✅ Implemented |
| Vulnerability Table             | ✅ Implemented |
| Search                          | ✅ Implemented |
| Filtering                       | ✅ Implemented |
| Backend Structure               | ✅ Implemented |
| Database Models                 | 🚧 Developing |
| Backend APIs                    | 🚧 Developing |
| Automated Data Collection       | 🚧 Developing |
| Threat Intelligence Integration | 🚧 Developing |
| GeoIP Enrichment                | 🚧 Planned    |
| Advanced Risk Scoring           | 🚧 Planned    |
| Full SOC Workflow               | 🚧 Planned    |

---

## 🔮 Future Development

The prototype will be extended with:

1. Automated vulnerability feed collection
2. NVD integration
3. CISA KEV integration
4. EPSS integration
5. Automated threat intelligence collection
6. Indicator correlation
7. Duplicate detection
8. GeoIP enrichment
9. Risk scoring
10. Threat intelligence visualization
11. Historical vulnerability trends
12. Advanced SOC analytics
13. Authentication and role-based access
14. Automated security reports

---

## 🎓 Academic Project

**Project:** SentinelSOC
**Domain:** Cybersecurity
**Area:** Security Operations Center, Threat Intelligence & Vulnerability Intelligence
**Type:** B.Tech Computer Science and Engineering Project
**Status:** Prototype / MVP

---

## 👥 Project Team

* Muhammed Aman
* Joel
* Vimal
* Naveen
* Nakul

---

## ⚠️ Disclaimer

SentinelSOC is an academic prototype developed for **educational, research, and demonstration purposes**.

Security information displayed by the system should be verified against authoritative sources before being used for production security decisions.

---

## 📄 License

This project is currently intended for academic and educational use.
