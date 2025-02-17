// src/pages/TestPage.jsx
import React from 'react';
import { Button } from 'antd';

const TestPage = () => {
  return (
    <main style={styles.content}>
      <div style={styles.contentContainer}>
        {/* ด้านซ้ายของหน้าจอ */}
        <div style={styles.textContainer}>
          <div style={styles.text}>
            ยินดีตอนรับสู่ Visioncareer
            
          </div>
          <div style={styles.descriptionText}>
            ทำแบบทดสอบเพียงไม่ถึง 30 นาที
            ค้นพบเส้นทางอนาคตที่เหมาะกับคุณได้ทันที
          </div>
          <div style={styles.buttonContainer}>
            <Button
              type="primary"
              style={styles.button}
              onMouseDown={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'} 
              onMouseUp={(e) => e.target.style.boxShadow = '0 10px 16px rgba(0, 0, 0, 0.2)'} 
            >
              <span>แบบทดสอบบุคลิกภาพ</span> 
            </Button>
          </div>
        </div>

        {/* ด้านขวาของหน้าจอ */}
        <div style={styles.rightBox}></div>
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',  // จัดข้อความให้อยู่ตรงกลางแนวตั้ง
    paddingRight: '20px',  // เพิ่มช่องว่างระหว่างข้อความและกล่องขาว
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
  descriptionText: {
    width: '672px', 
    marginTop: '50px',
    color: 'black', 
    fontSize: '24px', 
    fontFamily: 'Roboto', 
    fontWeight: 400, 
    wordWrap: 'break-word',
  },
  buttonContainer: {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '75px',
  },
  button: {
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
    justifyContent: 'center',
    boxShadow: '0 10px 16px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  rightBox: {
    width: '450px',
    height: '100vh',  // ความสูงเท่ากับความสูงของพื้นหลัง
    backgroundColor: 'white',  // กล่องขาว
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // เพิ่มเงาบางๆ เพื่อให้ดูเด่นขึ้น
  },
};

export default TestPage;

  