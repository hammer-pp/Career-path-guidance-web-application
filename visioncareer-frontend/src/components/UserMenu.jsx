
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const UserMenu = ({ user, onLogout }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={styles.userMenuWrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className={styles.username}>{user?.fullname || "ผู้ใช้"}</span>
      {hover && (
        <div className={styles.dropdownMenu}>
          <div onClick={() => navigate("/profile")}>ข้อมูลผู้ใช้</div>
          <div onClick={() => navigate("/history")}>ประวัติการทำแบบทดสอบ</div>
          <div onClick={onLogout}>ออกจากระบบ</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
