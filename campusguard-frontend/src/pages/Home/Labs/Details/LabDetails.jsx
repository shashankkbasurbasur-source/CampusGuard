// frontend/src/pages/home/Labs/Details/LabDetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * Rich Lab Details page for CampusGuard
 * - Supports ids: portscan, log, phishing, password
 * - Dark themed and uses Tailwind classes (same theme as Home)
 * - Contains: Overview, How it works, Learn more, Examples, Case studies, Threats, Diagrams
 * - Interactive collapsible sections
 */

const LAB_CONTENT = {
  portscan: {
    title: "Port Scan Lab",
    heroImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwgOB-iB_vj8wR-RMA46pOHdDGYpu38t3vQ&s",
    overview:
      "Port scanning is the process of probing a host for open network ports and the services behind them. In this lab you will learn why ports matter, how attackers use scans to find entry points, and how defenders can reduce exposure.",
    howItWorks: [
      "The lab simulates Nmap-like scans across a controlled target.",
      "It tests a curated list of common ports (SSH, HTTP, HTTPS, DB ports) and reports open/closed/filtered states.",
      "Each result includes an explanation of the service and mitigation advice.",
      "Interactive hints explain how firewall rules or service hardening would change results.",
    ],
    learnMore: [
      "Ports are logical endpoints for network connections — treat them as doors into a host.",
      "Service banners may reveal software versions that determine vulnerability risk.",
      "Attackers enumerate services first; defenders reduce the attack surface by closing unnecessary ports and using strict firewall rules.",
    ],
    examples: [
      {
        title: "Typical scan output",
        body:
          "Open: 22 (SSH) — SSH running. Closed: 21 (FTP). Filtered: 3306 (MySQL) — blocked by firewall.",
      },
      {
        title: "Interpreting results",
        body:
          "If SSH is open and accessible from the internet, consider disabling password auth or use key-based auth and limit source IPs.",
      },
    ],
    caseStudies: [
      {
        title: "Misconfigured DB exposed",
        body:
          "A public MySQL port left open allowed attackers to connect and exfiltrate data. Fix: restrict access to internal network and enable DB authentication.",
      },
    ],
    threats: [
      "Service fingerprinting reveals outdated software (e.g., Apache 2.4.XX) — leads to known exploits.",
      "Open management ports allow brute-force attempts if not protected.",
    ],
    asciiDiagram: [
      "Target host (10.0.0.4)",
      "",
      "  Internet",
      "     |",
      "  [Firewall: allows 22,443 only]  <-- good config",
      "     |",
      "  Host: 22: Open (ssh)  80: Closed  3306: Filtered",
    ],
    imageDiagram:
      "https://www.paloaltonetworks.com/content/dam/pan/en_US/images/cyberpedia/port-scanning.png?imwidth=1080",
    startRoute: "/labs/port-scan",
  },

  log: {
    title: "Log Analysis Lab",
    heroImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcF2F9vmJTeCfqtxGOig6kBYaPTBrViH0xQ&s",
    overview:
      "Log analysis is the practice of inspecting system and application logs to detect malicious behavior, troubleshooting issues, and understanding incident timelines. This lab teaches techniques and patterns used by real SOC analysts.",
    howItWorks: [
      "You will review sample logs (SSH, web server access, system auth logs) and use search & filters.",
      "The lab highlights suspicious sequences (repeated failures, odd timestamps, anomalous IPs).",
      "Automated hints identify likely brute-force, suspicious user agents, and privilege escalation attempts.",
    ],
    learnMore: [
      "Timestamps, source IPs and usernames are core to understanding events.",
      "Normalization (converting logs into structured fields) is key for analysis and SIEM ingestion.",
      "Correlate across logs (web + auth + firewall) to build incident timelines.",
    ],
    examples: [
      {
        title: "Brute force pattern",
        body:
          "Multiple 'Failed password for root' entries from an IP within seconds — indicative of an automated attempt.",
      },
      {
        title: "Suspicious access",
        body:
          "A successful login followed by immediate privilege escalation or unusual command execution suggests a compromise.",
      },
    ],
    caseStudies: [
      {
        title: "Detecting a botnet login",
        body:
          "A cluster of failed attempts across many accounts from a small IP range. Action: block the range and check for successful logins.",
      },
    ],
    threats: [
      "Credential stuffing using leaked password lists.",
      "Stealthy attackers that blend in with normal traffic by slowing the attempt rate.",
    ],
    asciiDiagram: [
      "Logs Timeline:",
      "",
      "  10:00 - Failed password for root from 1.2.3.4",
      "  10:00 - Failed password for root from 1.2.3.4",
      "  10:01 - Failed password for root from 1.2.3.4",
      "  10:02 - Accepted password for user 'backup' from 5.6.7.8",
    ],
    imageDiagram:
      "https://i.pinimg.com/736x/ea/45/d9/ea45d92c8dc7c49d21ad545103f6f2fe.jpg",
    startRoute: "/labs/log-analysis",
  },

  phishing: {
    title: "Phishing Mail Analysis",
    heroImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwD2wY_yhiJP4bn-YVcJI9dnf-33OxjGRirg&s",
    overview:
      "Phishing is a social engineering attack that tries to trick users into revealing credentials or running malicious attachments. This lab guides you through techniques to spot and analyze phishing content.",
    howItWorks: [
      "Paste or load an email and the lab will extract URLs, display destination domains, and highlight suspicious keywords.",
      "It provides a phishing likelihood score and explains which parts of the email triggered detection.",
      "Interactive hints show how to inspect headers and test suspicious links in a safe way.",
    ],
    learnMore: [
      "Spear phishing targets specific individuals with contextual info — harder to detect.",
      "Check sender address vs display name and view raw headers for forwarding chains.",
      "Never click links — inspect the URL and hover to reveal actual destinations.",
    ],
    examples: [
      {
        title: "Urgent verification scam",
        body:
          "An email says 'Verify your account now or it will be closed' with a link like http://example.com/login (but actual link points to a different domain).",
      },
    ],
    caseStudies: [
      {
        title: "CEO fraud (whaling)",
        body:
          "Attackers impersonate executives to request wire transfers. Prevention: multi-step approval for financial requests and email authentication (DMARC/SPF/DKIM).",
      },
    ],
    threats: [
      "Credential theft via fake login pages.",
      "Malware via attachments (macro-enabled documents).",
    ],
    asciiDiagram: [
      "Phishing flow:",
      "",
      "  Attacker -> Send spoofed email -> Victim clicks -> Fake login -> Credentials stolen",
    ],
    imageDiagram:
      "https://www.cloudflare.com/img/learning/security/threats/phishing-attack/diagram-phishing-attack.png",
    startRoute: "/labs/phishing-analysis",
  },

  password: {
    title: "Password Strength Lab",
    heroImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8VKq9i9WFPQUlY6LmKdnscL9GokAJwqMVA&s",
    overview:
      "This lab teaches fundamental concepts of password security, how attackers crack passwords, and how to create and evaluate strong credentials.",
    howItWorks: [
      "Enter a password and the lab analyzes length, character classes, dictionary words and common patterns.",
      "It simulates simple cracking strategies (dictionary + common mangling) to illustrate real-world risk.",
      "The lab outputs a score and concrete suggestions for improvement.",
    ],
    learnMore: [
      "Entropy (bits) is the canonical measure for password strength. More entropy = harder to guess.",
      "Passphrases (multiple words) often give better security with memorability than complex single-word substitutions.",
      "Use unique passwords + a reputable password manager to avoid reuse risk.",
    ],
    examples: [
      {
        title: "Weak example",
        body: "Password123 → predictable, commonly reused, easily guessed by dictionary + number rules.",
      },
      {
        title: "Strong example",
        body: "CorrectHorseBatteryStaple! → longer passphrase with symbols and mixed case; high entropy.",
      },
    ],
    caseStudies: [
      {
        title: "Leaked password reuse",
        body:
          "An organization allowed password reuse across systems. Attackers used leaked credentials to access multiple services. Fix: enforce unique passwords and MFA.",
      },
    ],
    threats: [
      "Brute-force and dictionary attacks.",
      "Credential stuffing using leaked lists.",
    ],
    asciiDiagram: [
      "Password strength (concept):",
      "",
      "  Entropy = log2(pool_size^length) -> higher is better",
    ],
    imageDiagram:
      "https://thumbs.dreamstime.com/b/blue-round-strong-password-concept-vector-linear-blue-round-concept-strong-password-thin-line-icons-internet-using-modern-103977849.jpg",
    startRoute: "/labs/password-strength",
  },
};

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 text-left w-full"
        aria-expanded={open}
      >
        <svg
          className={`w-5 h-5 transform ${open ? "rotate-90" : ""} transition`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 6 L14 10 L6 14 Z" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-xl font-semibold">{title}</h3>
      </button>

      {open && <div className="mt-3 text-gray-300">{children}</div>}
    </div>
  );
}

export default function LabDetails() {
  const { id } = useParams();
  const lab = LAB_CONTENT[id];

  if (!lab) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold">Lab not found</h1>
          <p className="mt-4 text-gray-400">The lab you requested does not exist.</p>
          <div className="mt-6">
            <Link to="/" className="px-4 py-2 bg-gray-800 text-white rounded-md">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero / header */}
        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white">{lab.title}</h1>
            <p className="mt-3 text-gray-400">{lab.overview}</p>

            <div className="mt-6 flex gap-3">
              <Link
                to={lab.startRoute}
                className="px-5 py-3 bg-violet-600 hover:bg-violet-700 rounded-md text-white font-semibold"
              >
                Start Lab →
              </Link>
              <Link to="/" className="px-5 py-3 border border-gray-700 rounded-md text-gray-300">
                Back to Home
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white">Quick facts</h4>
                <ul className="mt-3 list-disc list-inside text-gray-300 space-y-2">
                  <li>Difficulty: <span className="text-gray-200">Beginner → Intermediate</span></li>
                  <li>Estimated time: <span className="text-gray-200">15–40 minutes</span></li>
                  <li>Prerequisites: <span className="text-gray-200">Basic networking / OS knowledge</span></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white">What you'll learn</h4>
                <ul className="mt-3 list-disc list-inside text-gray-300 space-y-2">
                  {lab.howItWorks.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-72 hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800">
              <img src={lab.heroImg} alt={lab.title} className="w-full h-48 object-cover" />
              <div className="p-3 bg-gray-900">
                <p className="text-sm text-gray-300">{lab.title} • Practical lab</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sections (collapsible) */}
        <Section title="Learn more" defaultOpen={false}>
          <div className="space-y-3">
            {lab.learnMore.map((p, i) => (
              <p key={i} className="text-gray-300">{p}</p>
            ))}
          </div>
        </Section>

        <Section title="Examples" defaultOpen={false}>
          <div className="space-y-4">
            {lab.examples.map((ex, i) => (
              <div key={i} className="bg-gray-900 p-4 rounded-md border border-gray-800">
                <h5 className="font-semibold text-white">{ex.title}</h5>
                <p className="mt-2 text-gray-300">{ex.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Case studies" defaultOpen={false}>
          <div className="space-y-4">
            {lab.caseStudies.map((cs, i) => (
              <div key={i} className="bg-gray-900 p-4 rounded-md border border-gray-800">
                <h5 className="font-semibold text-white">{cs.title}</h5>
                <p className="mt-2 text-gray-300">{cs.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Threats & Mitigations" defaultOpen={false}>
          <div className="space-y-3">
            <ul className="list-disc list-inside text-gray-300">
              {lab.threats.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <p className="mt-3 text-gray-400">Mitigations: firewall rules, patch management, MFA, least-privilege and monitoring.</p>
          </div>
        </Section>

        <Section title="Diagrams (visual / ASCII)" defaultOpen={false}>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-md border border-gray-800 overflow-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {lab.asciiDiagram.join("\n")}
              </pre>
            </div>

            <div className="rounded-md overflow-hidden border border-gray-800">
              <img src={lab.imageDiagram} alt={`${lab.title} diagram`} className="w-full object-cover" />
            </div>
          </div>
        </Section>

        {/* Footer area with meta */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-gray-400">
          <p>
            These learning pages provide self-contained explanations and practical exercises. Use the <strong>Start Lab</strong> button to begin the hands-on environment.
          </p>
        </div>
      </div>
    </div>
  );
}
