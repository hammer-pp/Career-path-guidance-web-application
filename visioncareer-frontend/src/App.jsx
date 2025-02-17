import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import UniversityPage from "./pages/UniversityPage";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import './App.css';
import Logo from './assets/Logo.png';
import { Button } from 'antd';

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        {/* Header Section */}
        <header style={styles.header}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
              <img src={Logo} alt="Logo" style={{ width: "55px", height: "50px" }} />
              <div style={{ color: "black", fontSize: "32px", fontFamily: "Roboto", fontWeight: 900 }}>
                VisionCareer
              </div>
            </div>
          </Link>

          <nav>
            <ul style={styles.navList}>
              <li>
                <NavLink 
                  to="/test" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  })}
                >
                  แบบทดสอบ
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/university" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  })}
                >
                  มหาวิทยาลัย
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/news" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  })}
                >
                  ข่าวสาร
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  })}
                >
                  เกี่ยวกับเรา
                </NavLink>
              </li>
            </ul>
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button type="primary" style={styles.loginButton}>
                <span>เข้าสู่ระบบ</span>
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button type="primary" style={styles.registerButton}>
                <span>ลงทะเบียน</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "linear-gradient(90deg, #0357AF 0%, white 100%)",
  },
  header: {
    background: "linear-gradient(90deg, #0357AF 0%, white 100%)",
    padding: "32px 64px",
    display: "flex",
    alignItems: "center",
    gap: "50px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    
    // padding: 0,
    // marginTop: "3px",
    // backgroundColor: "transparent",
    alignItems: 'center',  // จัดให้อยู่ตรงกลางแนวตั้ง
    justifyContent: 'center',  // จัดให้อยู่ตรงกลางแนวนอน
    marginRight: "auto", // ทำให้ navList อยู่ตรงกลาง
  },
  navLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "24px",
    fontWeight: 400,
    wordWrap: "break-word",
    padding: "10px 20px",  // เพิ่มพื้นที่ภายในเมนู
    borderRadius: "25px",  // ทำให้มุมมน
    transition: "background-color 0.3s", // เพิ่มการเปลี่ยนสีเมนู
    margin: "0 10px",  // เพิ่มช่องว่างระหว่างเมนู
    boxSizing: "border-box",  // ใช้ box-sizing เพื่อไม่ให้ขนาดของปุ่มเปลี่ยนแปลง
    alignItems: 'center',  // จัดให้อยู่ตรงกลางแนวตั้ง
    justifyContent: 'center',  // จัดให้อยู่ตรงกลางแนวนอน
  },
  activeNavLink: {
    backgroundColor: "#F4F4F4",  // สีพื้นหลังเมื่อเลือก
    borderRadius: "25px",  // ทำให้มุมมน
    width: '170px',  // ปรับขนาดความกว้าง
    height: '50px',  // ปรับขนาดความสูง
    // display: 'flex',
    alignItems: 'center',  // จัดให้อยู่ตรงกลางแนวตั้ง
    justifyContent: 'center',  // จัดให้อยู่ตรงกลางแนวนอน
    fontSize: '24px',  // ปรับขนาดตัวอักษร
    lineHeight: '50px',  // ให้ตัวอักษรอยู่กึ่งกลาง
    boxSizing: "border-box",  // ใช้ box-sizing เพื่อไม่ให้ขนาดของปุ่มเปลี่ยนแปลง
  },
  loginButton: {
    background: '#F4F4F4',
    color: 'black',
    width: '160px',
    height: '50px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '20px',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  registerButton: {
    background: 'linear-gradient(90deg, #FFE259 0%, #E4815A 100%)',
    color: 'white',
    width: '160px',
    height: '50px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '20px',
    fontFamily: 'Roboto',
    fontWeight: '400',
  }
};

export default App;
