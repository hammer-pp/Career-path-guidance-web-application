import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
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
import styles from './styles/App.module.css'; // นำเข้าไฟล์ CSS Modules

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLoginOrRegisterPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={styles.container}>
      {/* Header Section */}
      {!isLoginOrRegisterPage && (
        <header className={styles.header}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
              <img src={Logo} alt="Logo" style={{ width: "55px", height: "50px" }} />
              <div style={{ color: "black", fontSize: "32px", fontFamily: "'Noto Sans Thai', sans-serif", fontWeight: 900, marginTop: "5px" }}>
                VisionCareer
              </div>
            </div>
          </Link>

          <nav>
            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/test"
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
                >
                  เส้นทางอนาคต
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/university"
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
                >
                  มหาวิทยาลัย
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
                >
                  ข่าวสาร
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}
                >
                  เกี่ยวกับเรา
                </NavLink>
              </li>
            </ul>
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button type="primary" className={styles.loginButton}>
                <span>เข้าสู่ระบบ</span>
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button type="primary" className={styles.registerButton}>
                <span>ลงทะเบียน</span>
              </Button>
            </Link>
          </div>
        </header>
      )}

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
  );
};

export default App;