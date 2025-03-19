// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/RegisterPage.module.css'; // นำเข้าไฟล์ CSS Modules

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    } else if (password !== confirmPassword) {
      alert("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!");
    } else {
      alert("ลงทะเบียนสำเร็จ!");
      navigate("/login");
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
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="name" className={styles.label}>
              ชื่อ
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="email" className={styles.label}>
              อีเมล
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
          <div className={styles.inputGroup}>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
              placeholder=" "
            />
            <label htmlFor="confirmPassword" className={styles.label}>
              ยืนยันรหัสผ่าน
            </label>
          </div>
          <button type="submit" className={styles.buttonregister}>
            ลงทะเบียน
          </button>
          <p className={styles.registerLink}>
            มีบัญชีอยู่แล้ว? <a href="/login" className={styles.link}>เข้าสู่ระบบ</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;