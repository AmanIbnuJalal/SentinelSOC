# 🛡️ SentinelSOC

### Automated Threat Intelligence Aggregator & OSINT Analytics Dashboard

> **Turning fragmented threat intelligence into actionable security insights.**

SentinelSOC is an automated **Security Operations Center (SOC) threat intelligence platform** designed to collect, normalize, enrich, analyze, and visualize **Indicators of Compromise (IOCs)** from multiple Open-Source Intelligence (OSINT) sources.

The platform brings threat intelligence from sources such as **AbuseIPDB, VirusTotal, URLhaus, and Feodo Tracker** into a unified dashboard, helping security analysts investigate suspicious IP addresses, domains, and file hashes without manually switching between multiple platforms.

---

## 📌 Problem Statement

Modern Security Operations Centers generate and receive enormous amounts of security alerts and threat intelligence.

Analysts often need to manually investigate an IOC across multiple services such as AbuseIPDB, VirusTotal, URLhaus, and other intelligence sources.

This creates several challenges:

* 🔴 **Alert Fatigue** — Large volumes of security alerts can overwhelm analysts.
* ⏱️ **High Investigation Time** — Manual verification across multiple platforms increases response time.
* 🔀 **Data Heterogeneity** — Different sources provide data in different formats and structures.
* ♻️ **Duplicate Intelligence** — The same IOC may appear across multiple feeds.
* 📊 **Inconsistent Risk Assessment** — Analysts may receive conflicting threat ratings from different sources.
* 🌍 **Limited Context** — Raw IOCs often lack geographic, ISP, and infrastructure information.

### 🎯 Our Solution

SentinelSOC provides a centralized platform that automatically:

**Collect → Normalize → Deduplicate → Enrich → Score → Visualize → Export**

This allows analysts to move from raw threat data to actionable intelligence more efficiently.

---

# 🚀 Key Features

## 🔍 1. Automated OSINT Ingestion

SentinelSOC periodically collects threat intelligence from multiple public sources.

Supported/integrated sources include:

* AbuseIPDB
* VirusTotal
* URLhaus
* Feodo Tracker
* AlienVault OTX
* Other configurable OSINT feeds

The ingestion layer is designed to handle different API and feed formats while maintaining a common internal structure.

---

## 🔄 2. Data Normalization

Threat intelligence providers return data in different formats.

SentinelSOC converts incoming information into a **unified IOC schema**, making it easier to process and compare intelligence from multiple sources.

Example IOC structure:

```json
{
  "indicator": "192.168.1.100",
  "type": "ip",
  "source": "AbuseIPDB",
  "confidence": 85,
  "country": "IN",
  "isp": "Example ISP",
  "risk_score": 80,
  "first_seen": "2026-09-10",
  "last_seen": "2026-09-10"
}
```

---

## ♻️ 3. Deduplication & Correlation

The same IOC may appear in multiple intelligence feeds.

SentinelSOC identifies duplicate indicators and correlates information from different sources into a single intelligence record.

For example:

```text
AbuseIPDB ─────┐
               │
VirusTotal ────┼──► 192.168.10.25 ──► Unified IOC
               │
URLhaus ───────┘
```

This reduces redundant records and provides a more complete picture of a threat.

---

## 🌍 4. GeoIP Enrichment

IP-based indicators are enriched with additional contextual information such as:

* 🌎 Country
* 🏙️ City
* 🌐 ISP
* 🏢 Organization
* 📍 Geographic coordinates
* 🔢 ASN information

This enables analysts to understand the geographic and network context of suspicious infrastructure.

---

## 📊 5. Dynamic Risk Scoring

SentinelSOC calculates a normalized risk score based on **multi-source threat intelligence consensus**.

### Risk Score Formula

$$
\text{Risk Score} =
\left(
\frac{\text{Flagged Sources}}
{\text{Total Queryable Sources}}
\right)
\times 100
$$

### Example

If an IP is identified as malicious by:

```text
AbuseIPDB     → Malicious
VirusTotal    → Malicious
URLhaus       → Malicious
Feodo Tracker → Not Found
```

Then:

```text
Flagged Sources       = 3
Total Queryable       = 4

Risk Score = (3 / 4) × 100
           = 75
```

The resulting score can be used to prioritize investigation.

> **Note:** The scoring model is a project-level consensus metric and should not be interpreted as an absolute probability that an IOC is malicious.

---

## 🔎 6. Universal IOC Search

Security analysts can quickly investigate different indicator types from a unified search interface.

### Supported IOC Types

| IOC Type      | Example                       |
| ------------- | ----------------------------- |
| 🌐 IP Address | `8.8.8.8`                     |
| 🔗 Domain     | `example.com`                 |
| #️⃣ File Hash | `SHA256 / MD5 / SHA1`         |
| 🔗 URL        | `https://example.com/payload` |

Instead of manually checking several services, the dashboard provides a centralized view of available intelligence.

---

## 🧱 7. Firewall Blocklist Generation

SentinelSOC can generate dynamic blocklists from identified malicious indicators.

Supported output formats include:

```text
.txt
.json
```

Example:

```text
192.168.10.25
45.67.89.10
103.45.21.7
185.12.34.56
```

These lists can be adapted for security infrastructure such as:

* pfSense
* Fortinet
* Firewalls
* IDS/IPS systems
* Network filtering tools

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────────────┐
                 │       OSINT SOURCES         │
                 │                             │
                 │ AbuseIPDB   VirusTotal      │
                 │ URLhaus     Feodo Tracker   │
                 │ AlienVault OTX              │
                 └──────────────┬──────────────┘
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │    1. INGESTION ENGINE      │
                 │                             │
                 │ APIs / Feeds / Scheduled    │
                 │ Background Jobs             │
                 └──────────────┬──────────────┘
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │ 2. NORMALIZATION & PARSING  │
                 │                             │
                 │ Common IOC Schema            │
                 │ Data Validation              │
                 └──────────────┬──────────────┘
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │   3. PROCESSING ENGINE      │
                 │                             │
                 │ Deduplication               │
                 │ IOC Correlation             │
                 │ GeoIP Enrichment             │
                 │ Risk Scoring                │
                 └──────────────┬──────────────┘
                                │
                                ▼
                 ┌─────────────────────────────┐
                 │       4. STORAGE            │
                 │                             │
                 │ PostgreSQL / SQLite /       │
                 │ MongoDB                     │
                 └──────────────┬──────────────┘
                                │
                                ▼
          ┌─────────────────────────────────────────┐
          │             5. SOC DASHBOARD             │
          │                                          │
          │ Threat Maps │ IOC Search │ Analytics      │
          │ Risk Scores │ Statistics │ Alerts        │
          └──────────────────┬──────────────────────┘
                             │
                             ▼
                 ┌─────────────────────────────┐
                 │     BLOCKLIST EXPORTER      │
                 │                             │
                 │ .TXT / .JSON / Firewall     │
                 │ Ready Indicators            │
                 └─────────────────────────────┘
```

---

# 🛠️ Technology Stack

### Frontend

* React.js / Vue.js
* TailwindCSS
* JavaScript / TypeScript
* Interactive charts and dashboard components

### Backend

* Python
* FastAPI / Django
* REST APIs
* IOC processing services

### Task Scheduling

* Celery
* Redis
* APScheduler / Cron

### Database

* PostgreSQL
* SQLite
* MongoDB

### Threat Intelligence

* AbuseIPDB
* VirusTotal
* URLhaus
* Feodo Tracker
* AlienVault OTX

### Enrichment

* GeoIP databases/APIs
* ASN information
* ISP/organization metadata

---

# 📂 Project Structure

```text
SentinelSOC/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── ingestion/
│   ├── enrichment/
│   ├── scoring/
│   ├── exporters/
│   ├── tests/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   └── package.json
│
├── data/
│   └── sample/
│
├── docs/
│   └── architecture/
│
├── .env.example
├── .gitignore
└── README.md
```

> The exact structure may vary depending on the implementation.

---

# 📥 Installation & Setup

## Prerequisites

Make sure the following are installed:

* Python 3.9+
* Node.js 16+
* npm
* Git
* Redis
* PostgreSQL / SQLite / MongoDB depending on configuration

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/SentinelSOC.git
cd SentinelSOC
```

---

# ⚙️ Backend Setup

```bash
cd backend
```

### Create a Virtual Environment

Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure the required values:

```env
DATABASE_URL=your_database_url

ABUSEIPDB_API_KEY=your_api_key
VIRUSTOTAL_API_KEY=your_api_key

REDIS_URL=redis://localhost:6379/0

GEOIP_DATABASE_PATH=path/to/geoip/database
```

> **Never commit API keys, passwords, database credentials, or other secrets to GitHub.**

---

## 🗄️ Database Setup

For Django:

```bash
python manage.py migrate
```

For Alembic:

```bash
alembic upgrade head
```

---

## ▶️ Start Backend

For FastAPI:

```bash
uvicorn main:app --reload
```

The backend will typically be available at:

```text
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend will typically be available at:

```text
http://localhost:3000
```

---

# 🔄 Background Workers

If Celery is used:

```bash
celery -A your_app worker --loglevel=info
```

Start Redis separately:

```bash
redis-server
```

The exact command may vary depending on the backend implementation.

---

# 🧪 Testing

SentinelSOC should be tested across the major stages of the intelligence pipeline.

### 1. Feed Retrieval Test

Verify that OSINT sources can be contacted successfully.

```text
API Request
     ↓
Response Received
     ↓
Data Parsed
     ↓
IOC Stored
```

Test files may be located under:

```text
tests/test_ingestion.py
```

---

### 2. Deduplication Test

Provide duplicate IOC records:

```text
192.168.1.10
192.168.1.10
192.168.1.10
```

Expected result:

```text
Single unified IOC record
```

---

### 3. Risk Scoring Test

Verify that the risk score changes according to the number of sources identifying an IOC.

Example:

```text
1 / 4 sources → 25
2 / 4 sources → 50
3 / 4 sources → 75
4 / 4 sources → 100
```

---

### 4. GeoIP Test

Verify that valid IP addresses return appropriate geographic and network metadata.

---

### 5. Export Test

Verify that malicious indicators are correctly converted into:

```text
.txt
.json
```

blocklist formats.

---

# 📊 Example Workflow

```text
          Suspicious IP
                │
                ▼
       ┌─────────────────┐
       │ SentinelSOC     │
       │ IOC Search      │
       └────────┬────────┘
                │
       ┌────────┼─────────┐
       ▼        ▼         ▼
   AbuseIPDB VirusTotal URLhaus
       │        │         │
       └────────┼─────────┘
                ▼
       Threat Intelligence
          Correlation
                │
                ▼
         Risk Score: 85
                │
       ┌────────┴────────┐
       ▼                 ▼
   GeoIP Context     Threat Details
       │                 │
       └────────┬────────┘
                ▼
        Analyst Decision
                │
                ▼
       Generate Blocklist
```

---

# 🔮 Future Roadmap

### 🤖 Machine Learning Detection

Introduce machine-learning models for:

* Anomaly detection
* Threat classification
* IOC reputation prediction
* Zero-day pattern identification

### 🔗 STIX/TAXII Integration

Support standardized threat intelligence exchange using:

* STIX
* TAXII

### ⚡ SOAR Integration

Automatically send high-confidence indicators to security infrastructure through:

* Webhooks
* SOAR platforms
* Firewall APIs
* SIEM integrations

### 📦 PCAP Analysis

Allow analysts to upload network packet captures and automatically:

```text
PCAP
 ↓
Extract IOCs
 ↓
Enrich
 ↓
Correlate
 ↓
Risk Score
 ↓
Visualize
```

### 📡 Real-Time Threat Monitoring

Future versions may provide real-time:

* Threat feed updates
* IOC alerts
* Risk changes
* Geographic threat visualization
* Dashboard notifications

---

# 🔒 Security Considerations

SentinelSOC is intended for **security research, education, and authorized defensive security operations**.

Users should:

* Protect API credentials using environment variables.
* Never commit `.env` files containing secrets.
* Use rate limits when interacting with external APIs.
* Respect the terms and usage limits of OSINT providers.
* Validate external data before processing it.
* Deploy appropriate authentication and authorization for production environments.

---

# ⚠️ Disclaimer

SentinelSOC is an academic cybersecurity project developed for **educational and defensive security purposes**.

Threat intelligence data can contain false positives, outdated indicators, or incomplete information. A high risk score should therefore be treated as an **investigation priority**, not definitive proof of malicious activity.

Always verify indicators using appropriate security procedures before taking disruptive actions such as blocking infrastructure.

---

# 👥 Project Team

### Department of Computer Science & Engineering

**College of Engineering Poonjar**

| # | Team Member       |
| - | ----------------- |
| 1 | **Nakul Mohan**   |
| 2 | **Muhammed Aman** |
| 3 | **Naveen Mohan**  |
| 4 | **Joel Siby**     |
| 5 | **Vimal Manoj**   |

---

# 📚 References & Acknowledgments

### Research References

1. Tariq, S., Chhetri, M. B., & Paris, C. (2025). *Alert Fatigue in Security Operations Centres: Research Challenges and Opportunities.*

2. Silva, F. A. C. S., et al. (2023). *Automated Solution for Enrichment and Quality IoC Creation from OSINT.*

### Threat Intelligence Sources

* AbuseIPDB
* VirusTotal
* URLhaus
* Feodo Tracker
* AlienVault OTX

---

# ⭐ Project Vision

> **SentinelSOC aims to transform fragmented OSINT threat intelligence into a centralized, automated, and analyst-friendly SOC intelligence platform.**

Instead of:

```text
🔎 Search → 🌐 Open Website → 📋 Copy IOC → 🔎 Search Again
→ Compare Results → 📝 Record Findings
```

SentinelSOC provides:

```text
              ┌─────────────────────┐
              │     SENTINELSOC     │
              │                     │
IOC ─────────►│  🔍 Search          │
              │  🌐 Enrichment      │
              │  📊 Analytics       │
              │  🎯 Risk Scoring    │
              │  🗺️ GeoIP Mapping   │
              │  🧱 Blocklist       │
              └─────────────────────┘
```

**One platform. Multiple intelligence sources. Actionable threat intelligence.**

---

## 📜 License

This project is intended primarily for academic and educational purposes. Add an appropriate open-source license such as **MIT**, **Apache-2.0**, or your institution's required license before public release.
