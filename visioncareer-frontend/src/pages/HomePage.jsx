import React from "react";
import LogoHomepage from '../assets/LogoHomepage.png';
import { Button } from 'antd';

const HomePage = () => {
  return (
    <main style={styles.content}>
      <div style={styles.contentContainer}>
        <div style={styles.textContainer}>
          <div style={styles.text}>
            ค้นหาเส้นทางที่ใช่<br/> 
            <span style={{ marginLeft: "100px" }}>ในอนาคตของคุณ</span>
          </div>
          <div style={{
            width: "672px", 
            marginTop: "50px",
            color: "black", 
            fontSize: "24px", 
            fontFamily: "Roboto", 
            fontWeight: 400, 
            wordWrap: "break-word",
          }}>
            คุณอยากรู้ไหมว่าอนาคตของคุณจะเป็นอย่างไร?<br/>
            มาวางแผนเส้นทางสู่ความสำเร็จไปด้วยกัน!
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            marginTop: "75px",
            marginLeft: "-220px"
          }}>
            <Button
              type="primary"
              style={{
                background: 'linear-gradient(90deg, #E4815A 0%, #F9D423 100%)',
                color: 'white',
                width: '250px',
                height: '90px',
                borderRadius: '30px',
                border: 'none', 
                fontSize: '20px',
                fontFamily: 'Roboto',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'center',
                justifyContent: "center",
                boxShadow: '0 10px 16px rgba(0, 0, 0, 0.2)',  // เพิ่มเงา
                transition: 'box-shadow 0.3s ease-in-out',  // เพิ่มการเปลี่ยนแปลงของเงา
              }}
              onMouseDown={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}  // เมื่อกดปุ่มเงาจะเปลี่ยน
              onMouseUp={(e) => e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}  // เมื่อปล่อยปุ่มเงาจะกลับมา
            >
              <span>เริ่มต้นการใช้งาน</span>
            </Button>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img 
            src={LogoHomepage} 
            alt="Logo Homepage" 
            style={styles.logoHomepage} 
          />
        </div>
      </div>
    </main>
  );
};

const styles = {
  content: {
    flex: 1,
    padding: "2rem",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  textContainer: {
    flex: "1",
    paddingLeft: "100px",
  },
  text: {
    color: "black",
    fontSize: "52px",
    fontFamily: "Roboto",
    fontWeight: 700,
    textTransform: "uppercase",
    wordWrap: "break-word",
    lineHeight: "1.2",
  },
  imageContainer: {
    flex: "1",
    display: "flex",
    marginLeft: "300px",
    marginTop: "80px",
  },
  logoHomepage: {
    width: "543px",
    height: "645px",
  },
};

export default HomePage;
