const API_URL = import.meta.env.VITE_BACKEND_URL;

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
export const registerUser = async (fullname, email, password) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");
    return await response.json();
  } catch (error) {
    console.error("Registration failed:", error);
    return null;
  }
};
