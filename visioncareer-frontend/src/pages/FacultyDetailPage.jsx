// src/pages/FacultyDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/UniversityDetailPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const FacultyDetailPage = () => {
  const { id: universityId, facultyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { faculty, university } = location.state || {};

  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await fetch(`${API_URL}/universities/${universityId}/faculties/${facultyId}/majors`);
        const data = await res.json();
        setMajors(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching majors:", err);
        setLoading(false);
      }
    };

    fetchMajors();
  }, [universityId, facultyId]);

  if (!faculty || !university) {
    navigate(-1);
    return null;
  }

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
            <p className={styles.location}>{faculty.facultyname}</p>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>สาขาทั้งหมด</h2>
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : majors.length > 0 ? (
            <ul className={styles.facultyList}>
              {majors.map((major) => (
                <li key={major.majorid} className={styles.facultyItem}>
                  {major.majorname}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noData}>ไม่มีข้อมูลสาขาวิชาในขณะนี้</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailPage;
