// src/pages/UniversityPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/UniversityPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;
// Mock data แทนการ fetch จาก API

// เจมจำลองข้อมูลไว้ใช้ พอไม่ใช่ คอมเม้นทิ้งไว้
// const mockUniversities = [
//   {
//     universityid: 1,
//     universityname: 'จุฬาลงกรณ์มหาวิทยาลัย',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_of_Chulalongkorn_University.svg'
//   },
//   {
//     universityid: 2,
//     universityname: 'มหาวิทยาลัยธรรมศาสตร์',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Emblem_of_Thammasat_University.svg'
//   },
//   {
//     universityid: 3,
//     universityname: 'มหาวิทยาลัยเกษตรศาสตร์',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/th/5/51/Logo_ku_th.svg'
//   },
//   {
//     universityid: 4,
//     universityname: 'มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/th/7/76/Seal_of_King_Mongkut\'s_University_of_Technology_Thonburi.svg'
//   },
//   {
//     universityid: 5,
//     universityname: 'มหาวิทยาลัยเทคโนโลยีพระจอมพระนครเหนือ',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/th/b/be/Seal_of_KMUTNB.svg'
//   },
//   {
//     universityid: 6,
//     universityname: 'มหาวิทยาลัยเชียงใหม่',
//     location: 'เชียงใหม่',
//     image: 'https://upload.wikimedia.org/wikipedia/th/d/db/Chiang_Mai_University.svg'
//   },
//   {
//     universityid: 7,
//     universityname: 'มหาวิทยาลัยมหิดล',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Mahidol_U.svg'
//   },
//   {
//     universityid: 8,
//     universityname: 'สถาบันเทคโนโลยีพระจอมเกล้าลาดกระบัง',
//     location: 'กรุงเทพมหานคร',
//     image: 'https://upload.wikimedia.org/wikipedia/th/e/e4/Seal_of_King_Mongkut\'s_Institute_of_Technology_Ladkrabang.svg'
//   }
// ];

const UniversityPage = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


// เจมจำลองข้อมูลไว้ใช้ พอไม่ใช่ คอมเม้นทิ้งไว้
// ใช้ mock data แทนการเรียก API
  // useEffect(() => {
    
  //   setUniversities(mockUniversities);
  // }, []);

    
  // อันเก่าของภพ ภพจะใช้เปิดคอมเม้น
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
