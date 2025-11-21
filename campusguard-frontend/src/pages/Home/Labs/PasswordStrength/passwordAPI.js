const API_BASE =
  import.meta.env.VITE_API_BASE || "https://campusguard-syfu.onrender.com";

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
