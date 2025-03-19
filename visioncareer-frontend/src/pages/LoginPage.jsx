// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/LoginPage.module.css'; // นำเข้าไฟล์ CSS Modules

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.brandName}>VisionCareer</h1>
        <p className={styles.tagline}>ค้นหาเส้นทางที่ใช่สำหรับคุณ</p>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={styles.homeButton}>
            <div className={styles.homeButtonText}>กลับสู่หน้าหลัก</div>
          </div>
        </Link>
        <div className={styles.circleContainer}>
          <div className={styles.circle}></div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.welcomeText}>สวัสดี</h2>
        <p className={styles.welcomeSubText}>ยินดีต้อนรับ</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="username" className={styles.label}>
              ชื่อผู้ใช้
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="password" className={styles.label}>
              รหัสผ่าน
            </label>
          </div>
          <button type="submit" className={styles.buttonlogin}>
            เข้าสู่ระบบ
          </button>
          <p className={styles.registerLink}>
            ยังไม่มีบัญชี? <a href="/register" className={styles.link}>สมัครสมาชิก</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;