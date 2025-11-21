export const analyzePassword = async (password) => {
  try {
    const res = await fetch("http://localhost:5000/password/analyze", {
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
