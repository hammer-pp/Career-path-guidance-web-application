require("dotenv").config(); // โหลดค่าตัวแปรจากไฟล์ .env
const express = require("express");
const db = require("./db"); // เชื่อมต่อฐานข้อมูลจากไฟล์ db.js

const app = express();
app.use(express.json()); // ให้รองรับ JSON request body

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

// ตั้งค่าพอร์ต
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/users", async (req, res) => {
    try {
      const users = await db("users").select("*");
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/users", async (req, res) => {
    try {
      const { fullname, email, password } = req.body;  // ใช้ fullname แทน full_name
      const [newUser] = await db("users")
        .insert({ fullname, email, password })  // ใช้ fullname แทน full_name
        .returning(["userid", "fullname", "email"]);
      res.json(newUser);
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

  