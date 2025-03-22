require("dotenv").config(); // โหลดค่าตัวแปรจากไฟล์ .env
const express = require("express");
const db = require("./db"); // เชื่อมต่อฐานข้อมูลจากไฟล์ db.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ให้รองรับ JSON request body

app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.1.78:5173"], // URL ของ Frontend (React)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ทดสอบ API และเชื่อมต่อฐานข้อมูล
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.raw("SELECT NOW();"); // ดึงเวลาปัจจุบันจาก PostgreSQL
    res.json({ success: true, time: result.rows[0] });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/users", async (req, res) => {
    try {
      const users = await db("users").select("*");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// ✅ อัปเดต API สมัครสมาชิก (Register)
app.post("/users", async (req, res) => {
  console.log("📥 Incoming request data:", req.body); // ✅ ตรวจสอบข้อมูลที่ส่งมา

  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // ตรวจสอบว่ามีอีเมลนี้ในระบบหรือยัง
  const existingUser = await db("Users").where({ email }).first();
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // เข้ารหัสรหัสผ่านก่อนบันทึก
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db("Users").insert({
    fullname,
    email,
    password: hashedPassword,
  });

  console.log("✅ User registered successfully:", newUser);
  res.status(201).json({ message: "User registered successfully" });
});



  // ดึงข้อมูลผู้ใช้ตาม ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db("users").where("userid", id).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// อัปเดตข้อมูลผู้ใช้
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password } = req.body;
    
    const updatedUser = await db("users")
      .where("userid", id)
      .update({ fullname, email, password })
      .returning(["userid", "fullname", "email"]);

    if (!updatedUser.length) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ ดึงข้อมูลผู้ใช้
    const user = await db("users").where({ email }).first();

    console.log("🛠️ Debug - User from DB:", user); // ✅ ตรวจสอบค่าที่ดึงมา

    if (!user) {
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    // ✅ ตรวจสอบรหัสผ่าน
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("🛠️ Debug - Password Match:", passwordMatch); // ✅ เช็คว่ารหัสผ่านตรงหรือไม่

    if (!passwordMatch) {
      return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ!", user });
  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});


app.post("/results", async (req, res) => {
  try {
    const { user_id, holland_group, big5_group } = req.body;

    // ตรวจสอบว่าผู้ใช้มีผลการทดสอบแล้วหรือไม่
    const existingResult = await db("results").where("user_id", user_id).first();

    if (existingResult) {
      // อัปเดตผลลัพธ์เดิม
      await db("results")
        .where("user_id", user_id)
        .update({ holland_group, big5_group });

      return res.json({ message: "Updated existing test result successfully." });
    } else {
      // บันทึกผลลัพธ์ใหม่
      await db("results").insert({ user_id, holland_group, big5_group });

      return res.json({ message: "Test result saved successfully." });
    }
  } catch (error) {
    console.error("Error saving test result:", error);
    res.status(500).json({ error: "Failed to save test result" });
  }
});

app.get("/results/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await db("results").where("user_id", user_id).first();

    if (!result) {
      return res.status(404).json({ error: "No test result found for this user." });
    }

    res.json(result);
  } catch (error) {
    console.error("Error retrieving test result:", error);
    res.status(500).json({ error: "Failed to retrieve test result" });
  }
});

app.get("/universities", async (req, res) => {
  try {
    const universities = await db.select("*").from("universities");
    res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recommendations/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // ✅ ดึงรายการคณะที่แนะนำให้ผู้ใช้
    const recommendations = await db("Recommendations as r")
      .join("University_Faculty as uf", "r.UniversityFacultyID", "=", "uf.UniversityFacultyID")
      .join("Universities as u", "uf.UniversityID", "=", "u.UniversityID")
      .join("Careers as c", "uf.FacultyID", "=", "c.FacultyID")
      .where("r.UserID", user_id)
      .select(
        "r.RecommendationID",
        "u.UniversityName",
        "uf.FacultyName",
        "c.CareerName",
        "r.CreatedAt"
      );

    if (recommendations.length === 0) {
      return res.status(404).json({ message: "No recommendations found for this user." });
    }

    res.json({ user_id, recommendations });

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations." });
  }
});

// ตั้งค่าพอร์ต
const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
