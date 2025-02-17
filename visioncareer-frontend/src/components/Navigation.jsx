import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  // สไตล์ที่ใช้งานกับ Link โดยพิจารณาจากสถานะ hover และ selected
  const getNavLinkStyle = (path) => {
    return location.pathname === path
      ? {
          background: '#F4F4F4', // สีพื้นหลังเมื่อเลือก
          borderRadius: '25px',
          padding: '10px 20px',
          boxShadow: '0 0 0 2px #F4F4F4', // กรอบสีขาว
          color: 'black',
        }
      : {
          textDecoration: 'none',
          color: 'black',
          fontSize: '24px',
          fontWeight: 400,
        };
  };

  return (
    <ul style={styles.navList}>
      <li>
        <Link to="/test" style={getNavLinkStyle('/test')} className="nav-item">
          แบบทดสอบ
        </Link>
      </li>
      <li>
        <Link to="/university" style={getNavLinkStyle('/university')} className="nav-item">
          มหาวิทยาลัย
        </Link>
      </li>
      <li>
        <Link to="/news" style={getNavLinkStyle('/news')} className="nav-item">
          ข่าวสาร
        </Link>
      </li>
      <li>
        <Link to="/about" style={getNavLinkStyle('/about')} className="nav-item">
          เกี่ยวกับเรา
        </Link>
      </li>
    </ul>
  );
};

// Styles
const styles = {
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    padding: 0,
    marginTop: '3px',
    backgroundColor: 'transparent',
  },
};

// CSS (hover effect)
const hoverStyle = `
  .nav-item:hover {
    background-color: rgba(61, 169, 252, 0.7) !important; /* สีที่ใช้ตอน hover */
    color: white; /* สีข้อความที่เปลี่ยนตอน hover */
    border-radius: 25px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
  }
`;

export default Navigation;
