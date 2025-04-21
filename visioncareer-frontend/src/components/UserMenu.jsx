
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserMenu = ({ user, onLogout }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={styles.userMenuWrapper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.userInfo}>
      <span className={styles.username}>{user?.fullname || "ผู้ใช้"}</span>
      <Avatar size="large" icon={<UserOutlined />} className={styles.avatar} />
      </div>
      {hover && (
        <div className={styles.dropdownMenu}>
          <div onClick={() => navigate("/profile", { state: { activeTab: 'profile' },replace: true  })}>ข้อมูลผู้ใช้</div>
          <div onClick={() => navigate("/profile", { state: { activeTab: 'testResults' } })}>
            ประวัติการทำแบบทดสอบ
          </div>
          <div onClick={onLogout}>ออกจากระบบ</div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
