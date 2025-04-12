// src/pages/FacultyDetailPage.jsx
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/UniversityDetailPage.module.css';

const FacultyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // รับข้อมูลคณะจาก location state
  const { faculty, university } = location.state || {};

  // ข้อมูลสาขาวิชาแบ่งตามมหาวิทยาลัยและคณะ
  const universityMajors = {
    "1": { // จุฬาลงกรณ์มหาวิทยาลัย
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมคอมพิวเตอร์",
        "สาขาวิศวกรรมไฟฟ้า",
        "สาขาวิศวกรรมเครื่องกล",
        "สาขาวิศวกรรมเคมี",
        "สาขาวิศวกรรมอุตสาหการ"
      ],
      "คณะบริหารธุรกิจ": [
        "สาขาการจัดการ",
        "สาขาการตลาด",
        "สาขาการเงิน",
        "สาขาการบัญชี",
        "สาขาระบบสารสนเทศทางธุรกิจ"
      ],
      "คณะแพทยศาสตร์": [
        "สาขาแพทยศาสตร์",
        "สาขาเวชศาสตร์ชะลอวัย",
        "สาขาเวชศาสตร์การกีฬา"
      ]
    },
    "2": { // มหาวิทยาลัยธรรมศาสตร์
      "คณะนิติศาสตร์": [
        "สาขานิติศาสตร์",
        "สาขากฎหมายระหว่างประเทศ",
        "สาขากฎหมายธุรกิจ"
      ],
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมคอมพิวเตอร์",
        "สาขาวิศวกรรมไฟฟ้า",
        "สาขาวิศวกรรมโยธา"
      ],
      "คณะเศรษฐศาสตร์": [
        "สาขาเศรษฐศาสตร์",
        "สาขาเศรษฐศาสตร์ระหว่างประเทศ",
        "สาขาเศรษฐศาสตร์ธุรกิจ"
      ]
    },
    "3": { // มหาวิทยาลัยเกษตรศาสตร์
      "คณะเกษตร": [
        "สาขาเกษตรศาสตร์",
        "สาขาพืชไร่",
        "สาขาพืชสวน"
      ],
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมเกษตร",
        "สาขาวิศวกรรมอาหาร",
        "สาขาวิศวกรรมสิ่งแวดล้อม"
      ]
    },
    // เพิ่มมหาวิทยาลัยอื่นๆ ตามต้องการ
    "4": { // มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมคอมพิวเตอร์",
        "สาขาวิศวกรรมหุ่นยนต์",
        "สาขาวิศวกรรมดิจิทัล"
      ]
    },
    "5": { // มหาวิทยาลัยเทคโนโลยีพระจอมพระนครเหนือ
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมอุตสาหการ",
        "สาขาวิศวกรรมเครื่องกล",
        "สาขาวิศวกรรมไฟฟ้า"
      ]
    },
    "6": { // มหาวิทยาลัยเชียงใหม่
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมคอมพิวเตอร์",
        "สาขาวิศวกรรมสิ่งแวดล้อม",
        "สาขาวิศวกรรมเครื่องกล"
      ],
      "คณะแพทยศาสตร์": [
        "สาขาแพทยศาสตร์",
        "สาขาเวชศาสตร์ครอบครัว"
      ]
    },
    "7": { // มหาวิทยาลัยมหิดล
      "คณะแพทยศาสตร์ศิริราชพยาบาล": [
        "สาขาแพทยศาสตร์",
        "สาขาเวชศาสตร์เขตร้อน"
      ],
      "คณะวิทยาศาสตร์": [
        "สาขาวิทยาการคอมพิวเตอร์",
        "สาขาจุลชีววิทยา"
      ]
    },
    "8": { // สถาบันเทคโนโลยีพระจอมเกล้าลาดกระบัง
      "คณะวิศวกรรมศาสตร์": [
        "สาขาวิศวกรรมคอมพิวเตอร์",
        "สาขาวิศวกรรมไฟฟ้า",
        "สาขาวิศวกรรมเครื่องกล"
      ],
      "คณะเทคโนโลยีสารสนเทศ": [
        "สาขาวิทยาการคอมพิวเตอร์",
        "สาขาเทคโนโลยีสารสนเทศ"
      ]
    }
  };

  // หากไม่มีข้อมูลให้กลับไปหน้าก่อนหน้า
  if (!faculty || !university) {
    navigate(-1);
    return null;
  }

  // ดึงข้อมูลสาขาวิชาตามมหาวิทยาลัยและคณะ
  const majors = universityMajors[university.id]?.[faculty] || [];

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ย้อนกลับ
        </button>
        
        <div className={styles.header}>
          <img 
            src={university.image} 
            alt={university.name} 
            className={styles.universityLogo}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
          <div className={styles.universityInfo}>
            <h1 className={styles.universityName}>{university.name}</h1>
            <p className={styles.location}>{faculty}</p>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>สาขาทั้งหมด</h2>
          {majors.length > 0 ? (
            <ul className={styles.facultyList}>
              {majors.map((major, index) => (
                <li key={index} className={styles.facultyItem}>
                  {major}
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