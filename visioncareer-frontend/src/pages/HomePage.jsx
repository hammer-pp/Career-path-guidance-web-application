import React from "react";
import { useNavigate } from "react-router-dom";
import LogoHomepage from '../assets/LogoHomepage.png';
import { Button } from 'antd';
import styles from '../styles/HomePage.module.css'; // นำเข้าไฟล์ CSS Modules

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/test");
  };

  return (
    <main className={styles.contenthome}>
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            ค้นหาเส้นทางที่ใช่<br/> 
            <span style={{ marginLeft: "100px" }}>ในอนาคตของคุณ</span>
          </div>
          <div className={styles.subText}>
            คุณอยากรู้ไหมว่าอนาคตของคุณจะเป็นอย่างไร?<br/>
            มาวางแผนเส้นทางสู่ความสำเร็จไปด้วยกัน!
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              type="primary"
              className={styles.buttonStyle}
              onClick={handleClick}
            >
              <span>เริ่มต้นการใช้งาน</span>
            </Button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src={LogoHomepage} 
            alt="Logo Homepage" 
            className={styles.logoHomepage} 
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;