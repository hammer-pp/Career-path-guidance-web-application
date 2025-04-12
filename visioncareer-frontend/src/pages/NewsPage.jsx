import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NewsPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const formatThaiDate = (dateString) => {
    const monthsThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year.toString().slice(-2)}`; // เช่น "5 ธ.ค. 67"
  };
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/news`);
        const data = await res.json();
        const sorted = [...data].sort((a, b) => new Date(b.publishedat) - new Date(a.publishedat));
        setNewsList(sorted);
        setFilteredNews(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredNews(newsList);
    } else {
      const filtered = newsList.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (news.summary && news.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredNews(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, newsList]);

  const handleClick = (news) => navigate(`/news/${news.newsid}`);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className={styles.container}>กำลังโหลด...</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>ข่าวสาร ประกาศจากกปอ. และสถาบันต่าง ๆ</h1>
        <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาข่าวสาร"
        />
         </div>
         </div>
        <div className={styles.content}>
          {currentNews.map((news) => (
            <div key={news.newsid} className={styles.card} onClick={() => handleClick(news)}>
              <img
                src={news.imageurls?.[0] || "https://via.placeholder.com/150?text=No+Image"}
                alt={news.title}
                className={styles.image}
              />
              <div className={styles.details}>
              <div className={styles.dateBadge}>{formatThaiDate(news.publishedat)}</div>
              <h2 className={styles.newsTitle}>{news.title}</h2>
                <p className={styles.newsSummary}>{news.summary}</p>
                <button className={styles.moreInfoButton}>อ่านเพิ่มเติม</button>
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

export default NewsPage;
