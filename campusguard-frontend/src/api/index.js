// src/api/index.js
const BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

async function request(path, opts = {}) {
  const url = `${BASE}${path}`;
  const headers = opts.headers || {};
  if (opts.body && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.headers.get("content-type")?.includes("application/json")
    ? res.json()
    : res.text();
}

export function getTargets() {
  return request("/api/targets/");
}

export function runScan(body) {
  return request("/api/scan/", { method: "POST", body });
}

export function getScan(jobId) {
  return request(`/api/scan/${jobId}`, { method: "GET" });
}

export function getTeacherLogs() {
  return request("/api/teacher/scanlogs", { method: "GET" });
}

export function aiFeedback(payload) {
  return request("/api/ai-feedback/", { method: "POST", body: payload });
}
