require("dotenv").config(); // โหลดค่าตัวแปรจากไฟล์ .env
const express = require("express");
const db = require("./db"); // เชื่อมต่อฐานข้อมูลจากไฟล์ db.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();
app.use(cors());
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

app.post("/users", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const [newUser] = await db("users")
      .insert({ fullname, email, password: hashedPassword })
      .returning(["userid", "fullname", "email"]);

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log("Login route was hit");  // ✅ ตรวจสอบว่า API ถูกเรียกจริง

  try {
    const { email, password } = req.body;
    console.log("Received data:", req.body);  // ✅ เช็คค่าที่ส่งมา

    const user = await db("users").where("email", email).first();
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.userid, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });
    console.log("Token generated:", token);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
