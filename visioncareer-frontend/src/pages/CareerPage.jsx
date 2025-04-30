import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/CareerPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const CareerPage = () => {
  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(`${API_URL}/careers`);
        const data = await response.json();
        setCareers(data);
        setFilteredCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCareers(careers);
    } else {
      const filtered = careers.filter((career) =>
        career.careername.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (career.description && career.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCareers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, careers]);

  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const currentCareers = filteredCareers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className={styles.container}>กำลังโหลดข้อมูล...</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>อาชีพ</h1>
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
          {currentCareers.map((career) => (
            <div 
              key={career.careerid} 
              className={styles.card}
              onClick={() => navigate(`/career/${career.careerid}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/career/${career.careerid}`);
                }
              }}
            >


              <div className={styles.details}>
                <h2 className={styles.careerName}>{career.careername}</h2>
                <p className={styles.description}>{career.description}</p>
                <button 
                  className={styles.moreInfoButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/career/${career.careerid}`);
                  }}
                >
                  ข้อมูลเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;