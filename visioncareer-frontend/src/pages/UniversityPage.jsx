// src/pages/UniversityPage.jsx
import React, { useEffect, useState } from "react";
import styles from '../styles/UniversityPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const UniversityPage = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${API_URL}/universities`);
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter((uni) =>
    uni.universityname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>มหาวิทยาลัย</h1>
          <div className={styles.filterBar}>
            <input
              type="text"
              placeholder="ค้นหา"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.content}>
          {filteredUniversities.map((uni) => (
            <div key={uni.universityid} className={styles.card}>
              <img src={uni.image} alt={uni.universityname} className={styles.image} />

              <div className={styles.details}>
                <h2 className={styles.uniName}>{uni.universityname}</h2>
                <p>{uni.location}</p>
                <button className={styles.moreInfoButton}>ข้อมูลเพิ่มเติม</button>
              </div>

              {/* ด้านล่างยังไม่มีข้อมูล rating/interest/suitability จริงเลยไม่ใส่ */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
