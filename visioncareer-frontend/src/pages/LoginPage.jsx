// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // เพิ่ม import Link

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    } else {
      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/");
      // เพิ่มโค้ดสำหรับส่งข้อมูลไปยังเซิร์ฟเวอร์ที่นี่
    }
  };

  return (
    <div style={styles.container}>
      {/* เพิ่ม CSS แบบปกติผ่าน <style> tag */}
      <style>
        {`
          .inputGroup input:focus + label,
          .inputGroup input:not(:placeholder-shown) + label {
          display: none;
          }
        `}
      </style>
      <div style={styles.leftSide}>
        <h1 style={styles.brandName}>VisionCareer</h1>
        <p style={styles.tagline}>ค้นหาเส้นทางที่ใช่สำหรับคุณ</p>
        {/* เพิ่มปุ่ม "กลับสู่หน้าหลัก" */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={styles.homeButton}>
            <div style={styles.homeButtonText}>กลับสู่หน้าหลัก</div>
          </div>
        </Link>
        {/* เพิ่มทรงกลมที่มุมซ้ายล่าง */}
        <div style={styles.circleContainer}>
          <div style={styles.circle}></div>
        </div>
      </div>
      <div style={styles.rightSide}>
        <h2 style={styles.welcomeText}>สวัสดี</h2>
        <p style={styles.welcomeSubText}>ยินดีต้อนรับ</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="inputGroup" style={styles.inputGroup}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder=" " // เพิ่ม placeholder เป็นค่าว่าง
            />
            <label htmlFor="username" style={styles.label}>
              ชื่อผู้ใช้
            </label>
          </div>
          <div className="inputGroup" style={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder=" " // เพิ่ม placeholder เป็นค่าว่าง
            />
            <label htmlFor="password" style={styles.label}>
              รหัสผ่าน
            </label>
          </div>
          <button type="submit" style={styles.button}>
            เข้าสู่ระบบ
          </button>
          <p style={styles.registerLink}>
            ยังไม่มีบัญชี? <a href="/register" style={styles.link}>สมัครสมาชิก</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  leftSide: {
    flex: 6,
    background: "linear-gradient(270deg, #74CEF7 0%, #0180CC 49%, #0357AF 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    padding: "20px 200px",
    position: "relative",
    overflow: "hidden",
  },
  brandName: {
    fontSize: "62px",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "30px",
    textAlign: "left",
  },
  rightSide: {
    flex: 4,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 20px 20px 160px",
  },
  welcomeText: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#333310",
    textAlign: "left",
  },
  welcomeSubText: {
    fontSize: "1.2rem",
    marginBottom: "40px",
    color: "#666",
    textAlign: "left",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    position: "relative",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "10px 0",
    fontSize: "16px",
    border: "none",
    borderBottom: "2px solid #adadad",
    outline: "none",
    background: "transparent",
  },
  label: {
    position: "absolute",
    top: "50%",
    left: "0",
    transform: "translateY(-50%)",
    fontSize: "16px",
    color: "#adadad",
    pointerEvents: "none",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "15px",
    background: "#0575E6",
    border: "none",
    borderRadius: "30px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  registerLink: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666",
  },
  link: {
    color: "#0357AF",
    textDecoration: "none",
  },
  circleContainer: {
    width: "500px",
    height: "500px",
    position: "absolute",
    left: "-250px",
    bottom: "-250px",
    overflow: "hidden",
  },
  circle: {
    width: "500px",
    height: "500px",
    background: "linear-gradient(330deg, #74CEF7 0%, #0180CC 50%, #0357AF 100%)",
    borderRadius: "9999px",
  },
  // สไตล์สำหรับปุ่ม "กลับสู่หน้าหลัก"
  homeButton: {
    width: "180px",
    height: "48px",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingTop: "8px",
    paddingBottom: "8px",
    background: "#0575E6",
    borderRadius: "30px",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    display: "inline-flex",
    marginTop: "20px", // เพิ่มระยะห่างจากข้อความด้านบน
  },
  homeButtonText: {
    color: "white",
    fontSize: "18px",
    // fontFamily: "Roboto",
    fontWeight: "400",
    wordWrap: "break-word",
  },
};

export default LoginPage;