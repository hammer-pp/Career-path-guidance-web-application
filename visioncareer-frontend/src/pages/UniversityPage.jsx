// src/pages/UniversityPage.jsx
import React from "react";
import styles from '../styles/UniversityPage.module.css'; // นำเข้าไฟล์ CSS Modules

const UniversityPage = () => {
  // ข้อมูลตัวอย่างสำหรับมหาวิทยาลัย
  const universities = [
    {
      id: 1,
      image: "https://via.placeholder.com/165",
      name: "มหาวิทยาลัย A",
      rating: 4.5,
      score: 85,
      interest: 75,
      suitability: 90,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/165",
      name: "มหาวิทยาลัย B",
      rating: 4.0,
      score: 80,
      interest: 70,
      suitability: 85,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/165",
      name: "มหาวิทยาลัย C",
      rating: 3.8,
      score: 78,
      interest: 65,
      suitability: 80,
    },
  ];

  return (
    <div className={styles.background}>
      {/* Container ที่มีพื้นหลังสีขาวและขนาดเล็กลง */}
      <div className={styles.container}>
        {/* หัวข้อ "มหาลัย" และแถบค้นหา/ตัวกรอง */}
        <div className={styles.header}>
          <h1 className={styles.title}>มหาวิทยาลัย</h1>
          <div className={styles.filterBar}>
            <input
              type="text"
              placeholder="ค้นหา"
              className={styles.searchInput}
            />
            <div className={styles.filterOptions}>
              <span className={styles.filterOption}>ทั้งหมด</span>
              <span className={styles.filterOption}>คะแนน</span>
              <span className={styles.filterOption}>ความสนใจ</span>
            </div>
          </div>
        </div>

        {/* ส่วนเนื้อหา: แสดงแถบข้อมูลมหาวิทยาลัย */}
        <div className={styles.content}>
          {universities.map((uni) => (
            <div key={uni.id} className={styles.card}>
              {/* รูปมหาวิทยาลัย */}
              <img src={uni.image} alt={uni.name} className={styles.image} />

              {/* ชื่อมหาวิทยาลัยและปุ่มข้อมูลเพิ่มเติม */}
              <div className={styles.details}>
                <h2 className={styles.uniName}>{uni.name}</h2>
                <button className={styles.moreInfoButton}>ข้อมูลเพิ่มเติม</button>
              </div>

              {/* คะแนน Rating */}
              <div className={styles.rating}>
                <span className={styles.stars}>★★★★☆</span>
                <span className={styles.ratingText}>{uni.rating}</span>
              </div>

              {/* คะแนน */}
              <div className={styles.score}>
                <span className={styles.scoreText}>คะแนน: {uni.score}</span>
              </div>

              {/* เปอร์เซ็นต์ความสนใจ */}
              <div className={styles.interest}>
                <span className={styles.interestText}>ความสนใจ: {uni.interest}%</span>
              </div>

              {/* ความเหมาะสม */}
              <div className={styles.suitability}>
                <span className={styles.suitabilityText}>ความเหมาะสม: {uni.suitability}%</span>
              </div>

              {/* จุดสามจุดสำหรับข้อมูลเพิ่มเติม */}
              <div className={styles.moreOptions}>
                <span className={styles.moreOptionsIcon}>...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;