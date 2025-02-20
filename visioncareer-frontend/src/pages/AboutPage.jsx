// src/pages/TestPage.jsx
import React from 'react';

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    width: '90%', // ให้ความกว้างไม่เกิน 90% ของหน้าจอ
    textAlign: 'center', // จัดข้อความให้อยู่กลาง
    fontFamily: "'Noto Sans Thai', sans-serif",
    backgroundColor: '#f9f9f9',
    borderRadius: '35px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'absolute', // ใช้ position absolute
    top: '50%', // ย้ายกล่องลงมา 50% จากด้านบน
    left: '50%', // ย้ายกล่องไปทางขวา 50% จากด้านซ้าย
    transform: 'translate(-50%, -50%)', // ย้ายกล่องกลับไปครึ่งหนึ่งของความกว้างและความสูงของกล่อง
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0357AF', // สีฟ้า
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  email: {
    fontSize: '18px',
    color: '#0357AF', // สีฟ้า
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  address: {
    fontSize: '16px',
    color: '#0357AF', // สีฟ้า
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  footer: {
    fontSize: '14px',
    color: '#777',
    marginTop: '30px',
    textAlign: 'center',
  },
};

const TestPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.description}>
        Please send us your questions, comments, or suggestions <br />we’d love to hear from you!
      </p>

      <div style={styles.email}>
        Email: <a href="mailto:support@visioncareer.com" style={{ color: '#889' }}>support@visioncareer.com</a>
      </div>

      <div style={styles.email}>
        Address:
      </div>

      <div style={styles.description}>
        Floor 10-11, Wisavawattana Building, <br />King Mongkut's University of Technology Thonburi<br />
        126 Pracha Uthit Road, Bang Mot Subdistrict, Thung Khru District, Bangkok 10140
      </div>

      <div style={styles.footer}>
        VisionCareer ©2025 Created by No36-CPE
      </div>
    </div>
  );
};

export default TestPage;