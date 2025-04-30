require("dotenv").config(); // โหลดค่าตัวแปรจากไฟล์ .env
const FLASK_URL = process.env.VITE_FLASK_URL;
const API_URL = process.env.VITE_API_URL;
const FRONTEND_URL = process.env.VITE_FRONTEND_URL;
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const MAPPING_FILE = path.join(__dirname, "holland_big5_to_career_mapping_final.csv");

function getMappedCareers(holland_group, big5_group) {
  return new Promise((resolve, reject) => {
    const matches = [];
    fs.createReadStream(MAPPING_FILE)
      .pipe(csv())
      .on("data", (row) => {
        if (
          parseInt(row.holland_group) === holland_group &&
          parseInt(row.big5_group) === big5_group
        ) {
          const ids = row.career_ids.replace(/\[|\]|\s/g, "").split(",").map(Number);
          matches.push(...ids);
        }
      })
      .on("end", () => resolve(matches))
      .on("error", (err) => reject(err));
  });
}

const express = require("express");
const db = require("./db"); // เชื่อมต่อฐานข้อมูลจากไฟล์ db.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // ให้รองรับ JSON request body

app.use(cors({
  origin: [FRONTEND_URL], // URL ของ Frontend (React)
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
  const existingUser = await db("users").where({ email }).first();
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // เข้ารหัสรหัสผ่านก่อนบันทึก
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db("users").insert({
    fullname,
    email,
    password: hashedPassword,
  });

  console.log("✅ User registered successfully:", newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db("users").where({ userid: id }).first();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ ดึงข้อมูลผู้ใช้ไม่สำเร็จ:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  let { fullname, email, password, phonenumber, dateofbirth, gender } = req.body;

  try {
    // ✅ ถ้าใส่ password → เข้ารหัสก่อน
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    } else {
      password = undefined; // ไม่อัปเดตรหัสผ่านถ้าไม่ได้ใส่มา
    }

    const updateData = {
      fullname,
      email,
      phonenumber,
      dateofbirth,
      gender
    };

    if (password) updateData.password = password;

    await db("users").where({ userid: id }).update(updateData);
    res.json({ message: "✅ อัปเดตสำเร็จ" });
  } catch (err) {
    console.error("❌ อัปเดตผู้ใช้ไม่สำเร็จ:", err);
    res.status(500).json({ error: "Internal server error" });
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

app.post("/get-mapped-careers", async (req, res) => {
  try {
    const { holland_group, big5_group } = req.body;
    if (holland_group === undefined || big5_group === undefined) {
      return res.status(400).json({ error: "Missing group" });
    }
    const career_ids = await getMappedCareers(holland_group, big5_group);
    res.json({ career_ids });
  } catch (error) {
    res.status(500).json({ error: "Failed to map careers" });
  }
});

// PATCH /save-test ตาม logic ใหม่
app.post("/save-test", async (req, res) => {
  try {
    const { user_id, answers, holland_group, big5_group } = req.body;
    if (user_id == null || answers == null || holland_group == null || big5_group == null)
      return res.status(400).json({ error: "Missing data" });

    const now = new Date();
    const [test] = await db("tests")
      .insert({
        userid: user_id,
        score: JSON.stringify(answers),
        createdat: now,
        holland_group: holland_group,
        big5_group: big5_group
      })
      .returning(["testid"]);
    res.json({ testid: test.testid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save test" });
  }
});

// PATCH /results
app.post("/results", async (req, res) => {
  try {
    const { user_id, testid, careerids } = req.body;
    if (!user_id || !testid || !Array.isArray(careerids) || careerids.length === 0)
      return res.status(400).json({ error: "Missing data" });

    const now = new Date();
    const recs = careerids.map(careerid => ({
      userid: user_id,
      testid: testid,
      careerid: careerid,
      createdat: now
    }));
    await db("recommendations").insert(recs);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save recommendations" });
  }
});

// GET /careers/all?ids=1,2,3
app.get('/careers/all', async (req, res) => {
  try {
    const ids = req.query.ids
      ? req.query.ids.split(',').map(Number).filter(id => !isNaN(id))
      : [];
    if (!ids.length) {
      return res.status(400).json({ error: "No ids provided." });
    }
    const careers = await db('careers').whereIn('careerid', ids);
    res.json(careers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 1. ดึงอาชีพที่ระบบแนะนำให้ user
// ✅ แสดงอาชีพจาก test ล่าสุด
app.get("/user/:user_id/recommended-careers", async (req, res) => {
  const { user_id } = req.params;

  try {
    const latestTest = await db("tests")
      .where("userid", user_id)
      .orderBy("createdat", "desc")
      .first();

    if (!latestTest) {
      return res.status(404).json({ error: "ไม่พบแบบทดสอบล่าสุดของผู้ใช้" });
    }

    const careers = await db("recommendations as r")
      .join("careers as c", "r.careerid", "=", "c.careerid")
      .where("r.userid", user_id)
      .andWhere("r.testid", latestTest.testid)
      .distinct("c.careerid", "c.careername", "c.description");

    res.json({ user_id, testid: latestTest.testid, careers });
  } catch (error) {
    console.error("❌ Error fetching recommended careers:", error);
    res.status(500).json({ error: "Failed to fetch recommended careers" });
  }
});

// ✅ 2. ดึงสาขาที่เชื่อมกับอาชีพ
app.get("/careers/:career_id/majors", async (req, res) => {
  const { career_id } = req.params;

  try {
    const majors = await db("major_career as mc")
      .join("majors as m", "mc.majorid", "=", "m.majorid")
      .where("mc.careerid", career_id)
      .select("m.majorid", "m.majorname", "m.description");

    res.json({ career_id, majors });
  } catch (error) {
    console.error("❌ Error fetching majors for career:", error);
    res.status(500).json({ error: "Failed to fetch majors for career" });
  }
});

// ✅ 3. ดึงข้อมูลสาขา + คณะ + มหาวิทยาลัย
app.get("/majors/:major_id/detail", async (req, res) => {
  const { major_id } = req.params;

  try {
    const majorInfo = await db("majors").where("majorid", major_id).first();

    if (!majorInfo) {
      return res.status(404).json({ error: "ไม่พบข้อมูลสาขานี้" });
    }

    const facultyInfo = await db("faculty_major as fm")
      .join("faculties as f", "fm.facultyid", "=", "f.facultyid")
      .where("fm.majorid", major_id)
      .select("f.facultyid", "f.facultyname")
      .first();

    const universities = await db("university_major as um")
      .join("universities as u", "um.universityid", "=", "u.universityid")
      .where("um.majorid", major_id)
      .select("u.universityid", "u.universityname", "u.location");

    res.json({
      ...majorInfo,
      faculty: facultyInfo || null,
      universities
    });
  } catch (error) {
    console.error("❌ Error fetching major detail:", error);
    res.status(500).json({ error: "Failed to fetch major detail" });
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

app.get("/universities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const university = await db("universities").where("universityid", id).first();
    if (!university) {
      return res.status(404).json({ error: "ไม่พบมหาวิทยาลัยนี้" });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET คณะทั้งหมดของมหาวิทยาลัย
app.get("/universities/:id/faculties", async (req, res) => {
  try {
    const { id } = req.params;
    const faculties = await db("university_faculty as uf")
      .join("faculties as f", "uf.facultyid", "=", "f.facultyid")
      .where("uf.universityid", id)
      .select("f.facultyid", "f.facultyname", "f.description");

    res.json(faculties);
  } catch (err) {
    console.error("❌ Error fetching faculties:", err);
    res.status(500).json({ error: "Failed to fetch faculties" });
  }
});

// GET สาขาของคณะในมหาวิทยาลัยนั้น
app.get("/universities/:universityId/faculties/:facultyId/majors", async (req, res) => {
  try {
    const { universityId, facultyId } = req.params;
    const majors = await db("university_major as um")
      .join("faculty_major as fm", "um.majorid", "=", "fm.majorid")
      .join("majors as m", "um.majorid", "=", "m.majorid")
      .where("um.universityid", universityId)
      .andWhere("fm.facultyid", facultyId)
      .select("m.majorid", "m.majorname", "m.description");

    res.json(majors);
  } catch (err) {
    console.error("❌ Error fetching majors:", err);
    res.status(500).json({ error: "Failed to fetch majors" });
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

app.get("/news", async (req, res) => {
  try {
    const news = await db("news").orderBy("publishedat", "desc");
    const withParsedImages = news.map(n => ({
      ...n,
      imageurls: (() => {
        try {
          return JSON.parse(n.imageurls || "[]");
        } catch {
          return [];
        }
      })()
    }));
    res.json(withParsedImages);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ดึงข่าวตาม ID
app.get("/news/:id", async (req, res) => {
  try {
    const news = await db("news").where("newsid", req.params.id).first();
    if (!news) return res.status(404).json({ error: "ไม่พบข่าว" });

    const parsedImageUrls = (() => {
      try {
        return JSON.parse(news.imageurls || "[]");
      } catch (e) {
        console.warn("⚠️ imageurls parse fail", e);
        return [];
      }
    })();

    res.json({ ...news, imageurls: parsedImageUrls });
  } catch (err) {
    console.error("❌ Failed to fetch news by id:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/careers", async (req, res) => {
  try {
    const careers = await db.select("").from("careers");
    res.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/careers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const career = await db("careers").where("careerid", id).first();
    if (!career) {
      return res.status(404).json({ error: "ไม่พบข้อมูลอาชีพนี้" });
    }
    res.json(career);
  } catch (error) {
    console.error("Error fetching career by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/careers/:id/majors", async (req, res) => {
  const { id } = req.params;
  try {
    // แก้ไข query ให้ดึงข้อมูลจากตารางที่ถูกต้อง
    const majors = await db("major_career")
      .join("majors", "major_career.majorid", "majors.majorid")
      .where("major_career.careerid", id)
      .select("majors.majorid", "majors.majorname", "majors.description");

    // ตรวจสอบและแปลงข้อมูลให้เป็น array เสมอ
    const result = Array.isArray(majors) ? majors : [];
    
    if (result.length === 0) {
      return res.status(200).json([]); // ส่งกลับ array ว่างแทนการส่ง error
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching majors for career:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/majors/:id/universities", async (req, res) => {
  const { id } = req.params;
  try {
    const universities = await db("university_major")
      .join("universities", "university_major.universityid", "universities.universityid")
      .where("university_major.majorid", id)
      .select("universities.*");

    if (universities.length === 0) {
      return res.status(404).json({ error: "ไม่พบมหาวิทยาลัยที่เปิดสาขานี้" });
    }

    res.json(universities);
  } catch (error) {
    console.error("Error fetching universities for major:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/majors/:id/faculty", async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await db("faculty_major")
      .join("faculties", "faculty_major.facultyid", "faculties.facultyid")
      .where("faculty_major.majorid", id)
      .select("faculties.*");

    if (faculty.length === 0) {
      return res.status(404).json({ error: "ไม่พบข้อมูลคณะที่เกี่ยวข้องกับสาขานี้" });
    }

    res.json(faculty);
  } catch (error) {
    console.error("Error fetching faculty for major:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ แสดงประวัติการแนะนำอาชีพทั้งหมดของผู้ใช้
app.get("/user/:user_id/recommendation-history", async (req, res) => {
  const { user_id } = req.params;

  try {
    const results = await db("recommendations as r")
      .join("careers as c", "r.careerid", "=", "c.careerid")
      .join("tests as t", "r.testid", "=", "t.testid")
      .where("r.userid", user_id)
      .orderBy("t.createdat", "desc")
      .select("r.testid", "t.createdat", "c.careerid", "c.careername", "c.description");

    // แยกผลลัพธ์ตาม testid
    const history = {};
    for (const row of results) {
      if (!history[row.testid]) {
        history[row.testid] = {
          createdat: row.createdat,
          careers: []
        };
      }
      history[row.testid].careers.push({
        careerid: row.careerid,
        careername: row.careername,
        description: row.description
      });
    }

    res.json({ user_id, history });
  } catch (error) {
    console.error("❌ Error fetching recommendation history:", error);
    res.status(500).json({ error: "Failed to fetch recommendation history" });
  }
});

// ตั้งค่าพอร์ต
const PORT = process.env.PORT || 5000;
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});