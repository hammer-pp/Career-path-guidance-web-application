import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/CareerFacultyDetailPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const CareerFacultyDetailPage = () => {
  const { majorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { major, career } = location.state || {};

  const [majorDetail, setMajorDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/majors/${majorId}/detail`);
        const data = await res.json();
        setMajorDetail(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [majorId]);

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;
  if (!major || !career) return <div>ไม่พบข้อมูลสาขาหรืออาชีพ</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ย้อนกลับ
        </button>

        <div className={styles.header}>
          <div className={styles.info}>
            <h1 className={styles.majorName}>{major.majorname}</h1>
            <p className={styles.careerName}>อาชีพที่เกี่ยวข้อง: {career.careername}</p>
          </div>
        </div>

        {majorDetail && (
          <div className={styles.majorDetailSection}>
            <h4 className={styles.sectionTitle}>📝 รายละเอียดสาขา: {majorDetail.majorname}</h4>
            <p className={styles.detailText}>{majorDetail.description}</p>

            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>คณะ:</span>
              <span className={styles.detailValue}>
                {majorDetail.faculty?.facultyname || "ไม่พบข้อมูล"}
              </span>
            </div>

            <h4 className={styles.sectionTitle}>🏫 มหาวิทยาลัยที่เปิดสอน</h4>
            <div className={styles.universitiesList}>
              {majorDetail.universities.map(u => (
                <div key={u.universityid} className={styles.universityItem}>
                  <div className={styles.universityName}>{u.universityname}</div>
                  <div className={styles.universityLocation}>{u.location}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerFacultyDetailPage;
