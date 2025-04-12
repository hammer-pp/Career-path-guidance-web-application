// src/pages/UniversityPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/UniversityPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const UniversityPage = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
            <div 
              key={uni.universityid} 
              className={styles.card}
              onClick={() => navigate(`/university/${uni.universityid}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/university/${uni.universityid}`);
                }
              }}
            >
              <img 
                src={uni.image} 
                alt={uni.universityname} 
                className={styles.image}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />

              <div className={styles.details}>
                <h2 className={styles.uniName}>{uni.universityname}</h2>
                <p>{uni.location}</p>
                <button 
                  className={styles.moreInfoButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/university/${uni.universityid}`);
                  }}
                >
                  ข้อมูลเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
