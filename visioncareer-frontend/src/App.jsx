import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import AuthContext, { AuthProvider } from "./pages/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import UniversityPage from "./pages/UniversityPage";
import UniversityDetailPage from "./pages/UniversityDetailPage";
import FacultyDetailPage from "./pages/FacultyDetailPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from './pages/NewsDetailPage';
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import './App.css';
import Logo from './assets/Logo.png';
import { Button,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './styles/App.module.css';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import UserMenu from './components/UserMenu'; // นำเข้าไฟล์ CSS Modules

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { user, logout } = useContext(AuthContext); // ✅ แก้ให้ useContext ทำงาน
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
                <NavLink to="/test" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                  เส้นทางอนาคต
                </NavLink>
              </li>
              <li>
                <NavLink to="/university" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                  มหาวิทยาลัย
                </NavLink>
              </li>
              <li>
                <NavLink to="/news" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                  ข่าวสาร
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                  เกี่ยวกับเรา
                </NavLink>
              </li>
            </ul>
          </nav>

          <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
            {user ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button type="primary" className={styles.loginButton}>เข้าสู่ระบบ</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button type="primary" className={styles.registerButton}>ลงทะเบียน</Button>
                </Link>
              </>
            )}
          </div>
        </header>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />}/>
        <Route path="/university" element={<UniversityPage />}/>
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/university/:id" element={<UniversityDetailPage />} />
        <Route path="/university/:id/faculty/:facultyId" element={<FacultyDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />}/>
      </Routes>
    </div>
  );
};

// ป้องกัน Route ที่ต้องล็อกอิน
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default App;