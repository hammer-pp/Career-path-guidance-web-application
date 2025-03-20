// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../pages/AuthContext";
import { loginUser } from "../api";
import styles from '../styles/LoginPage.module.css'; // นำเข้าไฟล์ CSS Modules

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(email, password);
    if (data) {
      login(data.user, data.token);
      navigate("/home"); // 🔹 ไปหน้าหลักหลังจากล็อกอิน
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className={styles.container}>
      {/* ส่วนซ้าย */}
      <div className={styles.leftSide}>
        <h1 className={styles.brandName}>VisionCareer</h1>
        <p className={styles.tagline}>ค้นหาเส้นทางที่ใช่สำหรับคุณ</p>
        <Link to="/" className={styles.homeButton}>
          <span className={styles.homeButtonText}>กลับสู่หน้าหลัก</span>
        </Link>
        <div className={styles.circleContainer}>
          <div className={styles.circle}></div>
        </div>
      </div>

      {/* ส่วนขวา */}
      <div className={styles.rightSide}>
        <h2 className={styles.welcomeText}>เข้าสู่ระบบ</h2>
        <p className={styles.welcomeSubText}>ยินดีต้อนรับสู่ VisionCareer</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="อีเมล"
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="รหัสผ่าน"
            />
          </div>
          <button type="submit" className={styles.buttonlogin}>เข้าสู่ระบบ</button>
        </form>

        <p className={styles.registerLink}>
          ยังไม่มีบัญชี? <Link to="/register" className={styles.link}>สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;