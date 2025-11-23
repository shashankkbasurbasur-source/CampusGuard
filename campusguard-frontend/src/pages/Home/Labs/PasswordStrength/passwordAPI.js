const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export const analyzePassword = async (password) => {
  try {
    const res = await fetch(`${API_BASE}/password/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { status: "error", message: "API request failed" };
  }
};

