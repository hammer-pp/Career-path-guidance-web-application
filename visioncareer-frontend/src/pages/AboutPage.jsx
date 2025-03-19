// src/pages/AboutPage.jsx
import React from 'react';
import styles from '../styles/AboutPage.module.css'; // นำเข้าไฟล์ CSS Modules

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.description}>
        Please send us your questions, comments, or suggestions <br />we’d love to hear from you!
      </p>

      <div className={styles.email}>
        Email: <a href="mailto:support@visioncareer.com">support@visioncareer.com</a>
      </div>

      <div className={styles.email}>
        Address:
      </div>

      <div className={styles.description}>
        Floor 10-11, Wisavawattana Building, <br />King Mongkut's University of Technology Thonburi<br />
        126 Pracha Uthit Road, Bang Mot Subdistrict, Thung Khru District, Bangkok 10140
      </div>

      <div className={styles.footer}>
        VisionCareer ©2025 Created by No36-CPE
      </div>
    </div>
  );
};

export default AboutPage;