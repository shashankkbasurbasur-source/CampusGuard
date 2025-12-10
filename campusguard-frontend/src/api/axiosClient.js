import axios from "axios";

/**
 * axiosClient
 * - Uses Vite env var VITE_BACKEND_URL (e.g. http://localhost:5001)
 * - Exposes helper for attaching auth token (Bearer)
 * - Provides upload helper for FormData
 * - Adds request/response interceptors for consistent error shape
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000, // 30s
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// simple token store (you may replace with auth context)
let getToken = () => localStorage.getItem("token");
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

// Request interceptor - add Authorization header if token present
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - normalize errors
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Normalize error shape for UI
    if (error.response) {
      // server responded with non-2xx
      const { status, data } = error.response;
      const normalized = {
        status,
        message: data?.message || data?.error || "Server error",
        data: data ?? null,
      };
      return Promise.reject(normalized);
    } else if (error.request) {
      // request made but no response
      return Promise.reject({ status: 0, message: "No response from server", data: null });
    } else {
      // something else
      return Promise.reject({ status: -1, message: error.message || "Request error", data: null });
    }
  }
);

/**
 * Helper: upload FormData
 * - Accepts URL path and either FormData or plain object (converted to FormData)
 */
export async function uploadForm(url, body, config = {}) {
  let form;
  if (body instanceof FormData) {
    form = body;
  } else {
    form = new FormData();
    Object.entries(body || {}).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      // If an array, append each file/element
      if (Array.isArray(v)) {
        v.forEach((x) => form.append(k, x));
      } else {
        form.append(k, v);
      }
    });
  }

  return axiosClient.post(url, form, {
    headers: { "Content-Type": "multipart/form-data" },
    ...config,
  });
}

export default axiosClient;
