import { useMemo, useState } from "react";
import "./App.css";

const vulnerabilities = [
  {
    cve: "CVE-2024-3094",
    name: "XZ Utils Backdoor",
    description:
      "Malicious code introduced into XZ Utils may allow unauthorized access through affected SSH environments.",
    cvss: 10.0,
    epss: 0.97,
    percentile: 99.8,
    kev: true,
    exploit: true,
    severity: "Critical",
    priority: "P1",
    product: "XZ Utils",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    summary:
      "A critical supply-chain vulnerability affecting XZ Utils with evidence of active exploitation.",
    action: "Immediately identify affected systems, isolate vulnerable hosts, and apply vendor remediation.",
  },
  {
    cve: "CVE-2024-21762",
    name: "Fortinet FortiOS Out-of-Bounds Write",
    description:
      "An out-of-bounds write vulnerability in FortiOS may allow remote code execution.",
    cvss: 9.8,
    epss: 0.91,
    percentile: 99.5,
    kev: true,
    exploit: true,
    severity: "Critical",
    priority: "P1",
    product: "Fortinet FortiOS",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary:
      "A remotely exploitable FortiOS vulnerability with high likelihood of exploitation.",
    action: "Patch affected FortiGate devices immediately and review exposed interfaces.",
  },
  {
    cve: "CVE-2023-4966",
    name: "Citrix NetScaler Bleed",
    description:
      "Sensitive information disclosure vulnerability affecting Citrix NetScaler ADC and Gateway.",
    cvss: 9.4,
    epss: 0.89,
    percentile: 99.2,
    kev: true,
    exploit: true,
    severity: "Critical",
    priority: "P1",
    product: "Citrix NetScaler ADC",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
    summary:
      "A high-impact information disclosure vulnerability affecting internet-facing infrastructure.",
    action: "Apply the vendor patch and rotate potentially exposed credentials and sessions.",
  },
  {
    cve: "CVE-2024-3400",
    name: "Palo Alto PAN-OS Command Injection",
    description:
      "A command injection vulnerability in PAN-OS may allow unauthenticated remote code execution.",
    cvss: 10.0,
    epss: 0.84,
    percentile: 98.9,
    kev: true,
    exploit: true,
    severity: "Critical",
    priority: "P1",
    product: "Palo Alto PAN-OS",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    summary:
      "A critical firewall vulnerability with public exploitation evidence and significant infrastructure impact.",
    action: "Apply emergency mitigation or patching and inspect firewall logs for compromise.",
  },
  {
    cve: "CVE-2024-6387",
    name: "OpenSSH regreSSHion",
    description:
      "A race condition in OpenSSH may result in unauthenticated remote code execution on vulnerable systems.",
    cvss: 8.1,
    epss: 0.72,
    percentile: 97.6,
    kev: false,
    exploit: true,
    severity: "High",
    priority: "P2",
    product: "OpenSSH",
    vector: "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary:
      "A high-severity OpenSSH vulnerability with meaningful exploitation potential.",
    action: "Prioritize internet-facing SSH servers and upgrade to a fixed OpenSSH version.",
  },
  {
    cve: "CVE-2023-34362",
    name: "MOVEit Transfer SQL Injection",
    description:
      "A SQL injection vulnerability in MOVEit Transfer may allow unauthorized database access.",
    cvss: 9.8,
    epss: 0.68,
    percentile: 96.8,
    kev: true,
    exploit: true,
    severity: "Critical",
    priority: "P1",
    product: "Progress MOVEit Transfer",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary:
      "A critical file-transfer vulnerability associated with widespread exploitation.",
    action: "Patch immediately and investigate systems for indicators of compromise.",
  },
  {
    cve: "CVE-2024-21410",
    name: "Microsoft Exchange Privilege Escalation",
    description:
      "A privilege escalation vulnerability in Microsoft Exchange Server.",
    cvss: 9.8,
    epss: 0.56,
    percentile: 94.3,
    kev: false,
    exploit: false,
    severity: "Critical",
    priority: "P2",
    product: "Microsoft Exchange Server",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary:
      "A critical Exchange vulnerability requiring priority remediation in enterprise environments.",
    action: "Apply Microsoft security updates and monitor authentication activity.",
  },
  {
    cve: "CVE-2024-22245",
    name: "VMware Workstation Information Disclosure",
    description:
      "An information disclosure issue affecting VMware Workstation and Fusion.",
    cvss: 7.7,
    epss: 0.32,
    percentile: 87.1,
    kev: false,
    exploit: false,
    severity: "High",
    priority: "P3",
    product: "VMware Workstation",
    vector: "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
    summary:
      "A high-severity vulnerability with lower observed exploitation probability.",
    action: "Include in the normal high-priority patching cycle.",
  },
  {
    cve: "CVE-2024-38063",
    name: "Windows TCP/IP Remote Code Execution",
    description:
      "A critical Windows TCP/IP vulnerability that may allow remote code execution.",
    cvss: 9.8,
    epss: 0.78,
    percentile: 98.1,
    kev: false,
    exploit: true,
    severity: "Critical",
    priority: "P2",
    product: "Microsoft Windows",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
    summary:
      "A critical Windows networking vulnerability with elevated exploitation likelihood.",
    action: "Deploy Microsoft security updates and prioritize exposed Windows systems.",
  },
];

const sourceData = [
  { name: "NVD", status: "Operational", updated: "2 min ago" },
  { name: "FIRST EPSS", status: "Operational", updated: "5 min ago" },
  { name: "CISA KEV", status: "Operational", updated: "8 min ago" },
  { name: "Exploit Intelligence", status: "Operational", updated: "12 min ago" },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [priority, setPriority] = useState("All");
  const [kevOnly, setKevOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const filtered = useMemo(() => {
    return vulnerabilities.filter((v) => {
      const matchesSearch =
        v.cve.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase());

      const matchesSeverity =
        severity === "All" || v.severity === severity;

      const matchesPriority =
        priority === "All" || v.priority === priority;

      const matchesKev = !kevOnly || v.kev;

      return matchesSearch && matchesSeverity && matchesPriority && matchesKev;
    });
  }, [search, severity, priority, kevOnly]);

  const refresh = () => {
    setLastUpdated("Just now");
  };

  const pageTitle =
    activePage === "Dashboard"
      ? "Vulnerability Intelligence"
      : activePage;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">S</div>
          <div>
            <strong>SentinelSOC</strong>
            <span>Security Intelligence</span>
          </div>
        </div>

        <div className="nav-label">MONITORING</div>

        {["Dashboard", "Vulnerabilities", "Analytics", "Sources"].map(
          (item) => (
            <button
              key={item}
              className={`nav-item ${
                activePage === item ? "active" : ""
              }`}
              onClick={() => setActivePage(item)}
            >
              <span className="nav-icon">
                {item === "Dashboard"
                  ? "⌂"
                  : item === "Vulnerabilities"
                  ? "◈"
                  : item === "Analytics"
                  ? "▥"
                  : "◎"}
              </span>
              {item}
            </button>
          )
        )}

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            All systems operational
          </div>

          <div className="analyst">
            <div className="avatar">MA</div>
            <div>
              <strong>SOC Analyst</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Security Operations /</div>
            <h1>{pageTitle}</h1>
          </div>

          <div className="top-actions">
            <div className="update">
              <span className="live-dot"></span>
              Updated {lastUpdated}
            </div>
            <button className="refresh" onClick={refresh}>
              ↻ Refresh
            </button>
            <div className="notification">♢</div>
          </div>
        </header>

        {activePage === "Dashboard" && (
          <>
            <section className="hero">
              <div>
                <h2>Vulnerability Overview</h2>
                <p>
                  Monitor, prioritize and respond to vulnerabilities
                  using risk-based intelligence.
                </p>
              </div>
              <div className="hero-badge">
                <span></span> Intelligence Engine Active
              </div>
            </section>

            <section className="stats-grid">
              <StatCard
                title="Total Vulnerabilities"
                value="12,486"
                change="+4.8%"
                icon="◈"
              />
              <StatCard
                title="Critical / High"
                value="2,184"
                change="+2.1%"
                icon="!"
                danger
              />
              <StatCard
                title="KEV Listed"
                value="327"
                change="+12"
                icon="◆"
                warning
              />
              <StatCard
                title="High EPSS"
                value="1,026"
                change="EPSS > 0.5"
                icon="↗"
                purple
              />
            </section>

            <section className="analytics-grid">
              <div className="panel trend-panel">
                <div className="panel-header">
                  <div>
                    <h3>Vulnerability Trend</h3>
                    <span>Last 30 days</span>
                  </div>
                  <button className="small-select">30 Days ▾</button>
                </div>

                <div className="chart">
                  <div className="y-axis">
                    <span>600</span>
                    <span>450</span>
                    <span>300</span>
                    <span>150</span>
                    <span>0</span>
                  </div>
                  <div className="chart-area">
                    <div className="grid-line one"></div>
                    <div className="grid-line two"></div>
                    <div className="grid-line three"></div>
                    <div className="grid-line four"></div>
                    <svg
                      className="line-chart"
                      viewBox="0 0 700 240"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        points="0,185 55,170 110,178 165,145 220,158 275,128 330,138 385,102 440,116 495,86 550,95 605,62 700,42"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <polyline
                        points="0,210 55,202 110,207 165,193 220,198 275,180 330,190 385,166 440,175 495,155 550,164 605,142 700,132"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity=".3"
                      />
                    </svg>
                    <div className="x-axis">
                      <span>Aug 20</span>
                      <span>Aug 27</span>
                      <span>Sep 03</span>
                      <span>Sep 10</span>
                      <span>Sep 17</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel severity-panel">
                <div className="panel-header">
                  <div>
                    <h3>Severity Distribution</h3>
                    <span>Current inventory</span>
                  </div>
                </div>

                <div className="donut-wrap">
                  <div className="donut">
                    <div className="donut-center">
                      <strong>12.4K</strong>
                      <span>Total</span>
                    </div>
                  </div>

                  <div className="legend">
                    <Legend label="Critical" value="742" className="critical" />
                    <Legend label="High" value="1,442" className="high" />
                    <Legend label="Medium" value="4,936" className="medium" />
                    <Legend label="Low" value="5,366" className="low" />
                  </div>
                </div>
              </div>
            </section>

            <section className="panel table-panel">
              <div className="panel-header table-heading">
                <div>
                  <h3>Priority Vulnerabilities</h3>
                  <span>Threats requiring analyst attention</span>
                </div>
                <button
                  className="view-all"
                  onClick={() => setActivePage("Vulnerabilities")}
                >
                  View all →
                </button>
              </div>

              <VulnerabilityTable
                data={vulnerabilities.slice(0, 6)}
                onSelect={setSelected}
              />
            </section>
          </>
        )}

        {activePage === "Vulnerabilities" && (
          <section className="panel vulnerability-page">
            <div className="page-intro">
              <div>
                <h2>Vulnerability Database</h2>
                <p>
                  Search and prioritize vulnerabilities using CVSS,
                  EPSS, KEV and exploit intelligence.
                </p>
              </div>
              <button className="refresh" onClick={refresh}>
                ↻ Update Data
              </button>
            </div>

            <div className="filters">
              <div className="search-box">
                <span>⌕</span>
                <input
                  placeholder="Search CVE or vulnerability..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>All</option>
                <option>P1</option>
                <option>P2</option>
                <option>P3</option>
                <option>P4</option>
              </select>

              <button
                className={`filter-button ${kevOnly ? "selected" : ""}`}
                onClick={() => setKevOnly(!kevOnly)}
              >
                ◆ KEV Only
              </button>
            </div>

            <div className="results-info">
              Showing <strong>{filtered.length}</strong> vulnerabilities
              <span>•</span> Sorted by priority
            </div>

            <VulnerabilityTable
              data={filtered}
              onSelect={setSelected}
              full
            />
          </section>
        )}

        {activePage === "Analytics" && (
          <section className="analytics-page">
            <div className="page-intro">
              <div>
                <h2>Security Analytics</h2>
                <p>
                  Understand vulnerability trends and exploitation
                  signals across the environment.
                </p>
              </div>
            </div>

            <div className="stats-grid">
              <StatCard title="Avg. CVSS" value="7.4" change="+0.3" icon="◈" />
              <StatCard title="Avg. EPSS" value="0.42" change="+6.2%" icon="↗" purple />
              <StatCard title="KEV Growth" value="+12" change="This week" icon="◆" warning />
              <StatCard title="Exploited" value="684" change="+8.7%" icon="!" danger />
            </div>

            <div className="analytics-cards">
              <div className="panel large-chart">
                <div className="panel-header">
                  <div>
                    <h3>EPSS Distribution</h3>
                    <span>Probability of exploitation</span>
                  </div>
                </div>
                <div className="bars">
                  {[32, 48, 61, 72, 55, 82, 67, 91, 78, 96, 86, 73].map(
                    (height, i) => (
                      <div className="bar-wrap" key={i}>
                        <div className="bar" style={{ height: `${height}%` }}></div>
                        <span>{i + 1}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="panel priority-panel">
                <div className="panel-header">
                  <div>
                    <h3>Priority Breakdown</h3>
                    <span>Risk-based classification</span>
                  </div>
                </div>

                <div className="priority-list">
                  <PriorityRow priority="P1" label="Immediate Action" value="327" />
                  <PriorityRow priority="P2" label="High Priority" value="1,857" />
                  <PriorityRow priority="P3" label="Scheduled" value="4,932" />
                  <PriorityRow priority="P4" label="Monitor" value="5,370" />
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "Sources" && (
          <section className="panel sources-page">
            <div className="page-intro">
              <div>
                <h2>Intelligence Sources</h2>
                <p>
                  Monitor the availability and freshness of security
                  intelligence feeds.
                </p>
              </div>
            </div>

            <div className="source-grid">
              {sourceData.map((source) => (
                <div className="source-card" key={source.name}>
                  <div className="source-icon">◎</div>
                  <div className="source-main">
                    <h3>{source.name}</h3>
                    <span>Last update: {source.updated}</span>
                  </div>
                  <div className="operational">
                    <span></span>
                    {source.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="panel source-info">
              <h3>Data Pipeline</h3>
              <div className="pipeline">
                <Pipeline name="NVD" text="CVE & CVSS intelligence" />
                <Pipeline name="FIRST EPSS" text="Exploit probability" />
                <Pipeline name="CISA KEV" text="Known exploited vulnerabilities" />
                <Pipeline name="Exploit Intel" text="Public exploit evidence" />
              </div>
            </div>
          </section>
        )}
      </main>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-cve">{selected.cve}</div>
                <h2>{selected.name}</h2>
              </div>
              <button
                className="close"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>

            <div className="detail-badges">
              <span className={`severity ${selected.severity.toLowerCase()}`}>
                {selected.severity}
              </span>
              <span className={`priority ${selected.priority.toLowerCase()}`}>
                {selected.priority}
              </span>
              {selected.kev && <span className="kev">◆ CISA KEV</span>}
              {selected.exploit && (
                <span className="exploit">⚡ Exploit Evidence</span>
              )}
            </div>

            <div className="details-grid">
              <Detail label="CVSS Score" value={`${selected.cvss} / 10`} />
              <Detail label="EPSS Score" value={`${selected.epss}`} />
              <Detail label="EPSS Percentile" value={`${selected.percentile}%`} />
              <Detail label="Affected Product" value={selected.product} />
            </div>

            <div className="detail-section">
              <h3>Vulnerability Description</h3>
              <p>{selected.description}</p>
            </div>

            <div className="detail-section">
              <h3>CVSS Vector</h3>
              <code>{selected.vector}</code>
            </div>

            <div className="detail-section insight">
              <div className="insight-title">
                <span>✦</span>
                AI-Generated Risk Summary
              </div>
              <p>{selected.summary}</p>
            </div>

            <div className="detail-section recommendation">
              <div className="insight-title">
                <span>✓</span>
                Recommended Action
              </div>
              <p>{selected.action}</p>
            </div>

            <div className="detail-section">
              <h3>References & Intelligence</h3>
              <div className="references">
                <span>NVD Database ↗</span>
                <span>FIRST EPSS ↗</span>
                <span>CISA KEV ↗</span>
                <span>Exploit Intelligence ↗</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, change, icon, danger, warning, purple }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${danger ? "danger" : ""} ${warning ? "warning" : ""} ${purple ? "purple" : ""}`}>
        {icon}
      </div>
      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{change}</small>
      </div>
    </div>
  );
}

function Legend({ label, value, className }) {
  return (
    <div className="legend-row">
      <span className={`legend-dot ${className}`}></span>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PriorityRow({ priority, label, value }) {
  return (
    <div className="priority-row">
      <span className={`priority ${priority.toLowerCase()}`}>{priority}</span>
      <div>
        <strong>{label}</strong>
        <small>Vulnerabilities</small>
      </div>
      <b>{value}</b>
    </div>
  );
}

function Pipeline({ name, text }) {
  return (
    <div className="pipeline-item">
      <span className="status-dot"></span>
      <div>
        <strong>{name}</strong>
        <small>{text}</small>
      </div>
      <span className="connected">Connected</span>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function VulnerabilityTable({ data, onSelect, full = false }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>CVE ID</th>
            <th>Vulnerability</th>
            <th>CVSS</th>
            <th>EPSS</th>
            <th>EPSS %</th>
            <th>KEV</th>
            <th>Exploit</th>
            <th>Severity</th>
            <th>Priority</th>
          </tr>
        </thead>

        <tbody>
          {data.map((v) => (
            <tr key={v.cve} onClick={() => onSelect(v)}>
              <td>
                <strong className="cve">{v.cve}</strong>
              </td>
              <td>
                <div className="vuln-name">
                  <strong>{v.name}</strong>
                  <span>{v.product}</span>
                </div>
              </td>
              <td>
                <span className={`score ${v.cvss >= 9 ? "critical-score" : ""}`}>
                  {v.cvss}
                </span>
              </td>
              <td>
                <span className="epss-score">{v.epss}</span>
              </td>
              <td>{v.percentile}%</td>
              <td>
                {v.kev ? (
                  <span className="yes">YES</span>
                ) : (
                  <span className="no">NO</span>
                )}
              </td>
              <td>
                {v.exploit ? (
                  <span className="exploit-badge">Available</span>
                ) : (
                  <span className="no">None</span>
                )}
              </td>
              <td>
                <span className={`severity ${v.severity.toLowerCase()}`}>
                  {v.severity}
                </span>
              </td>
              <td>
                <span className={`priority ${v.priority.toLowerCase()}`}>
                  {v.priority}
                </span>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="9" className="empty">
                No vulnerabilities match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {full && (
        <div className="table-footer">
          <span>Showing {data.length} results</span>
          <div>
            <button>‹</button>
            <button className="current-page">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;