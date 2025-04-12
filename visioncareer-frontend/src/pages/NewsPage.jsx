// src/pages/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NewsPage.module.css';

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Mock data จากข้อมูล TCAS จริงที่คุณให้มา
  const mockNewsData = [
    // กลุ่มประกาศล่าสุด (ธ.ค. 67 - ก.พ. 68)
    {
      id: 1,
      title: "เฉลยชื่อสอบ A-Level ประจำปี 2568",
      date: "19 ธ.ค. 68",
      summary: "ประกาศผลสอบ A-Level ปีการศึกษา 2568",
      imageUrl: "https://www.mytcas.com/news/images/alevel2568-result.jpg",
      detail: "ประกาศผลสอบ A-Level ประจำปีการศึกษา 2568 สามารถตรวจสอบผลสอบได้ที่เว็บไซต์ mytcas.com ตั้งแต่วันที่ 19 ธันวาคม 2568 เป็นต้นไป"
    },
    {
      id: 2,
      title: "การบริหารจัดการสิทธิ์ รอบที่ 1 Portfolio",
      date: "3 ก.พ. 68",
      summary: "ประกาศเกี่ยวกับการจัดการสิทธิ์รอบ Portfolio",
      imageUrl: "https://i.mytcas.com/wp-content/uploads/2025/02/03105157/475766928_610253964926881_2012894034497657146_n-1024x1024.webp",
      detail: "ประกาศการบริหารจัดการสิทธิ์สำหรับผู้สมัครในรอบที่ 1 Portfolio ปีการศึกษา 2568"
    },
    {
      id: 3,
      title: "สำหรับผู้สมัครสนามสอบจังหวัดปัตถานีและสงขลา",
      date: "6 ธ.ค. 67",
      summary: "แจ้งความประสงค์ของวัฒนธรรมสำเร็จ",
      imageUrl: "https://www.mytcas.com/news/images/southern-exam.jpg",
      detail: "ประกาศสำหรับผู้สมัครสอบในจังหวัดปัตถานีและสงขลาเกี่ยวกับการแจ้งความประสงค์ทางวัฒนธรรม"
    },
    {
      id: 4,
      title: "ศูนย์สอบมหาวิทยาลัยอุบลราชธานี แจ้งเข้าออกห้องสอบ",
      date: "6 ธ.ค. 67",
      summary: "แจ้งรายละเอียดการเข้าห้องสอบ TPAT2 และ TPAT5",
      imageUrl: "https://www.mytcas.com/news/images/ubon-exam-center.jpg",
      detail: "ศูนย์สอบมหาวิทยาลัยอุบลราชธานี แจ้งกำหนดการเข้าออกห้องสอบสำหรับวิชา TPAT2 และ TPAT5 ในวันที่ 7 ธันวาคม 2567"
    },
    {
      id: 5,
      title: "อย่าลืม!!! เอกสารสำคัญในการสอบ",
      date: "5 ธ.ค. 67",
      summary: "ประกาศเตือนเกี่ยวกับเอกสารที่ต้องนำเข้าห้องสอบ",
      imageUrl: "https://www.mytcas.com/news/images/exam-documents.jpg",
      detail: "ประกาศเตือนผู้สมัครสอบเกี่ยวกับเอกสารสำคัญที่ต้องนำมาในวันสอบ ได้แก่ บัตรประชาชน และบัตรเข้าสอบ"
    },
    {
      id: 6,
      title: "สรุปข้อมูลผู้สมัครสอบที่ได้รับผลกระทบจากน้ำท่วมภาคใต้",
      date: "5 ธ.ค. 67",
      summary: "ประกาศสำหรับผู้สมัครสอบในพื้นที่ประสบภัยน้ำท่วม",
      imageUrl: "https://www.mytcas.com/news/images/flood-announcement.jpg",
      detail: "สรุปข้อมูลผู้สมัครสอบ TGAT/TPAT2-5 ที่ได้รับผลกระทบจากสถานการณ์น้ำท่วมภาคใต้ ณ วันที่ 5 ธันวาคม 2567"
    },
    {
      id: 7,
      title: "พร้อมแล้ว!! รับสมัครสอบ A-Level",
      date: "2 ก.พ. 67",
      summary: "เปิดรับสมัครสอบ A-Level วันที่ 1-10 กุมภาพันธ์ 2567",
      imageUrl: "https://www.mytcas.com/news/images/alevel-registration.jpg",
      detail: "ประกาศรับสมัครสอบ A-Level ประจำปีการศึกษา 2567 ระหว่างวันที่ 1-10 กุมภาพันธ์ 2567"
    },
    {
      id: 8,
      title: "การแก้ไขผลสอบรายวิชา TGAT ส่วนที่ 3",
      date: "15 ม.ค. 67",
      summary: "ประกาศเกี่ยวกับการแก้ไขผลสอบ TGAT3",
      imageUrl: "https://www.mytcas.com/news/images/tgat-correction.jpg",
      detail: "ประกาศเรื่องการแก้ไขผลลัพธ์การสอบรายวิชา TGAT ส่วนที่ 3 สำหรับผู้สมัครที่พบปัญหา"
    },
    {
      id: 9,
      title: "บทลงโทษการกระทำผิดกฎระเบียบการสอบ",
      date: "9 ธ.ค. 66",
      summary: "ประกาศบทลงโทษสำหรับผู้กระทำผิดกฎระเบียบการสอบ",
      imageUrl: "https://www.mytcas.com/news/images/exam-rules.jpg",
      detail: "ประกาศเรื่องบทลงโทษการกระทำการฝ่าฝืนกฎระเบียบการสอบในวิชา TGAT, TPAT และ A-Level ปีการศึกษา 2567"
    },
    {
      id: 10,
      title: "การจัดสนามสอบ TGAT/TPAT2-5 และ A-Level",
      date: "ก.ค. 66",
      summary: "ประกาศเกี่ยวกับการจัดสนามสอบรูปแบบใหม่",
      imageUrl: "https://www.mytcas.com/news/images/exam-venue.jpg",
      detail: "ประกาศเรื่องการจัดสนามสอบสำหรับ TGAT/TPAT2-5 และ A-Level ในปีการศึกษา 2567"
    },
    {
      id: 11,
      title: "พร้อมแล้ว!! รับสมัครสอบ TGAT/TPAT2-5",
      date: "ก.ค. 66",
      summary: "เปิดรับสมัครสอบ TGAT/TPAT2-5",
      imageUrl: "https://www.mytcas.com/news/images/tgat-registration.jpg",
      detail: "ประกาศรับสมัครสอบ TGAT/TPAT2-5 ประจำปีการศึกษา 2567"
    },
    {
      id: 12,
      title: "ปฏิทินการสอบ TGAT/TPAT และ A-Level",
      date: "ก.ค. 66",
      summary: "อัปเดตปฏิทินการสอบปีการศึกษา 2567",
      imageUrl: "https://www.mytcas.com/news/images/exam-calendar.jpg",
      detail: "ประกาศปฏิทินการสอบ TGAT/TPAT และอัปเดตปฏิทินการสอบ A-Level ปีการศึกษา 2567"
    }
  ];

  // จำนวนรายการต่อหน้า
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // เรียงลำดับข่าวจากวันที่ล่าสุดไปเก่าสุด
        const sortedNews = [...mockNewsData].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setNewsList(sortedNews);
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลข่าวสารได้");
        setLoading(false);
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

  const handleNewsClick = (newsItem) => {
    navigate(`/news/${newsItem.id}`, { state: { news: newsItem } });
  };

  // คำนวณหน้าทั้งหมด
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  // ดึงข้อมูลสำหรับหน้าปัจจุบัน
  const currentNews = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.loading}>กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>ข่าวสาร ประกาศจากกปอ. และสถาบันต่าง ๆ</h1>
          <div className={styles.filterBar}>
            <input
              type="text"
              placeholder="ค้นหาข่าวสาร..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.content}>
          {currentNews.map((news) => (
            <div 
              key={news.id} 
              className={styles.card}
              onClick={() => handleNewsClick(news)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNewsClick(news);
                }
              }}
            >
              <img 
                src={news.imageUrl} 
                alt={news.title} 
                className={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
              <div className={styles.details}>
                <div className={styles.dateBadge}>{news.date}</div>
                <h2 className={styles.newsTitle}>{news.title}</h2>
                <p className={styles.newsSummary}>{news.summary}</p>
                <button 
                  className={styles.moreInfoButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewsClick(news);
                  }}
                >
                  อ่านเพิ่มเติม
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
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