// src/pages/NewsDetailPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/NewsDetailPage.module.css';

const NewsDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { news } = location.state || {};

  if (!news) {
    navigate('/news');
    return null;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ย้อนกลับ
          </button>
          <h1 className={styles.newsTitle}>{news.title}</h1>
        </div>

        <div className={styles.newsDetail}>
          <div className={styles.newsMeta}>
            <span className={styles.newsDate}>เผยแพร่เมื่อ: {news.publishedat}</span>
          </div>
          
          {news.imageUrl && (
            <div className={styles.newsImageContainer}>
              <img 
                src={news.imageUrl} 
                alt={news.title} 
                className={styles.newsImage}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                }}
              />
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