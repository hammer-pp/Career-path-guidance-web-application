// src/pages/UniversityDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/UniversityDetailPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const UniversityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityAndFaculties = async () => {
      try {
        const uniRes = await fetch(`${API_URL}/universities/${id}`);
        const uniData = await uniRes.json();

        const facRes = await fetch(`${API_URL}/universities/${id}/faculties`);
        const facData = await facRes.json();

        setUniversity(uniData);
        setFaculties(facData);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching university or faculties:", err);
        setLoading(false);
      }
    };

    fetchUniversityAndFaculties();
  }, [id]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (!university) return <div>ไม่พบข้อมูลมหาวิทยาลัย</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ย้อนกลับ
        </button>

        <div className={styles.header}>
          <img
            src={university.image}
            alt={university.universityname}
            className={styles.universityLogo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
          <div className={styles.universityInfo}>
            <h1 className={styles.universityName}>{university.universityname}</h1>
            <p className={styles.location}>{university.location}</p>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>คณะที่เปิดสอน</h2>
          <ul className={styles.facultyList}>
            {faculties.map((faculty) => (
              <li
                key={faculty.facultyid}
                className={styles.facultyItem}
                onClick={() =>
                  navigate(`/university/${id}/faculty/${faculty.facultyid}`, {
                    state: { faculty, university },
                  })
                }
                style={{ cursor: 'pointer' }}
              >
                {faculty.facultyname}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;
