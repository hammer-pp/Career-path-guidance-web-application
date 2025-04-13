const API_URL = import.meta.env.VITE_API_URL;
const FLASK_URL = import.meta.env.VITE_FLASK_URL;

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
    const response = await fetch(`${API_URL}/users`, {
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

// ✅ ฟังก์ชันทำนายจากแบบทดสอบ
export async function predictAnswers(answers, user_id) {
  try {
    const response = await fetch(`${FLASK_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers, user_id })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Prediction failed");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("❌ Failed to fetch prediction:", err);
    throw err;
  }
}

export async function fetchUniversities() {
  const response = await fetch(`${API_URL}/universities`);
  if (!response.ok) throw new Error("Failed to fetch universities");
  return await response.json();
}
