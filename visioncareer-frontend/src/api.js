const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ ฟังก์ชันล็อกอิน
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Invalid email or password");
    return await response.json();
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

// ✅ ฟังก์ชันสมัครสมาชิก
export async function registerUser(fullname, email, password) {
  console.log("📤 Sending request to API:", { fullname, email, password });

  try {
    const response = await fetch("http://192.168.1.78:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password }),
    });

    const data = await response.json();
    console.log("📥 Response from API:", data);

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("⚠️ Registration failed:", error);
    throw error;
  }
}

