import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/NewsDetailPage.module.css';

const API_URL = import.meta.env.VITE_API_URL;

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const formatThaiDate = (dateString) => {
    const monthsThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
                        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year.toString().slice(-2)}`;
  };
  
  useEffect(() => {
    fetch(`${API_URL}/news/${id}`)
      .then((res) => res.json())
      .then(setNews)
      .catch(() => navigate('/news'));
  }, [id]);

  if (!news) return <div className={styles.container}>กำลังโหลด...</div>;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>ย้อนกลับ</button>
        <h1 className={styles.newsTitle}>{news.title}</h1>
        </div>
        <div className={styles.newsDetail}>
        <div className={styles.newsMeta}>
        <span className={styles.newsDate}>เผยแพร่เมื่อ: {formatThaiDate(news.publishedat)}</span>
        </div>
        {news.imageurls?.length > 0 && (
          <div className={styles.newsImagesContainer}>
            {news.imageurls.map((url, i) => (
              <img key={i} src={url} alt={`ภาพ ${i + 1}`} className={styles.newsImage} />
            ))}
          </div>
        )}

        <div className={styles.newsContent}>
          <p>{news.content}</p>
        </div>
     
      
      </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
