// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import styles from '../styles/RegisterPage.module.css'; // นำเข้าไฟล์ CSS Modules

const RegisterPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    const data = await registerUser(fullname, email, password);
    if (data) {
      alert("สมัครสมาชิกสำเร็จ!");
      navigate("/login");
    } else {
      alert("สมัครสมาชิกไม่สำเร็จ");
    }
  };


  return (
    <div className={styles.container}>
      {/* ส่วนซ้าย */}
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

      {/* ส่วนขวา */}
      <div className={styles.rightSide}>
        <h2 className={styles.welcomeText}>สมัครสมาชิก</h2>
        <p className={styles.welcomeSubText}>สร้างบัญชีของคุณ</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className={styles.input}
              placeholder="ชื่อเต็ม"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="อีเมล"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="รหัสผ่าน"
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="ยืนยันรหัสผ่าน"
            />
          </div>
          <button type="submit" className={styles.buttonregister}>สมัครสมาชิก</button>
          <p className={styles.registerLink}>
            มีบัญชีอยู่แล้ว? <Link to="/login" className={styles.link}>เข้าสู่ระบบ</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;