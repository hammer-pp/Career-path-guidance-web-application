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
    <div style={styles.container}>
      {/* Header Section */}
      {!isLoginOrRegisterPage && (
        <header style={styles.header}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}>
              <img src={Logo} alt="Logo" style={{ width: "55px", height: "50px" }} />
              <div style={{ color: "black", fontSize: "32px", fontFamily: "'Noto Sans Thai', sans-serif", fontWeight: 900, marginTop: "5px" }}>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: "auto",
  },
  navLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "24px",
    fontWeight: 400,
    wordWrap: "break-word",
    padding: "10px 20px",
    borderRadius: "25px",
    transition: "background-color 0.3s",
    margin: "0 10px",
    boxSizing: "border-box",
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavLink: {
    backgroundColor: "#F4F4F4",
    borderRadius: "25px",
    width: '170px',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    lineHeight: '50px',
    boxSizing: "border-box",
  },
  loginButton: {
    background: '#F4F4F4',
    color: 'black',
    width: '160px',
    height: '50px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '20px',
    fontFamily: "'Noto Sans Thai', sans-serif",
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
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: '400',
  }
};

export default App;