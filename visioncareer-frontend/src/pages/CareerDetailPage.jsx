import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/CareerDetailPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const CareerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [career, setCareer] = useState(location.state?.career || null);
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerAndMajors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ถ้าไม่มี career ใน location.state ให้ดึงข้อมูลใหม่
        if (!location.state?.career) {
          const careerRes = await fetch(`${API_URL}/careers/${id}`);
          if (!careerRes.ok) throw new Error('Failed to fetch career');
          const careerData = await careerRes.json();
          setCareer(careerData);
        }

        // เรียกข้อมูลสาขาที่เกี่ยวข้อง
        const majorsRes = await fetch(`${API_URL}/careers/${id}/majors`);
        if (!majorsRes.ok) throw new Error('Failed to fetch majors');
        let majorsData = await majorsRes.json();
  
        // ตรวจสอบว่า majorsData เป็น array หรือไม่
        if (!Array.isArray(majorsData)) {
          majorsData = majorsData.majors || [];
        }
  
        setMajors(majorsData);
      } catch (err) {
        console.error("Error fetching career or majors:", err);
        setError(err.message);
        setMajors([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCareerAndMajors();
  }, [id, location.state]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error}</div>;
  if (!career) return <div>ไม่พบข้อมูลอาชีพ</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ย้อนกลับ
        </button>

        <div className={styles.header}>
          <div className={styles.careerInfo}>
            <h1 className={styles.careerName}>{career.careername}</h1>
            <p className={styles.description}>{career.description}</p>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>สาขาที่เกี่ยวข้อง</h2>
          {majors.length > 0 ? (
            <ul className={styles.majorList}>
              {majors.map((major) => (
                <li
                  key={major.majorid}
                  className={styles.majorItem}
                  onClick={() =>
                    navigate(`/career/${id}/major/${major.majorid}`, {
                      state: { major, career },
                    })
                  }
                >
                  {major.majorname}
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่พบสาขาที่เกี่ยวข้อง</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerDetailPage;