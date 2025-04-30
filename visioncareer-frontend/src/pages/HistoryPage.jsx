import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Card, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HistoryPage.module.css';

const { Title, Text } = Typography;
const API_URL = import.meta.env.VITE_API_URL;

const HistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/user/${user.userid}/recommendation-history`);
        setHistory(res.data.history || {});
      } catch (err) {
        console.error("❌ ไม่สามารถโหลดประวัติผลลัพธ์:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleCareerClick = (career) => {
    navigate(`/career/${career.careerid}`, {
      state: { career }
    });
  };

  return (
    <div className={styles.historyContainer}>
      <Title level={3}>ประวัติการทดสอบทั้งหมด</Title>
      
      {Object.keys(history).length === 0 ? (
        <Card>
          <Text>ยังไม่มีประวัติการทำแบบทดสอบ</Text>
        </Card>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={Object.entries(history)}
          loading={loading}
          renderItem={([testid, entry]) => (
            <List.Item key={testid}>
              <Card
                title={`🧪 แบบทดสอบเมื่อ: ${new Date(entry.createdat).toLocaleString()}`}
                className={styles.testCard}
              >
                <List
                  dataSource={entry.careers}
                  renderItem={(career) => (
                    <List.Item 
                      className={styles.careerItem}
                      onClick={() => handleCareerClick(career)}
                    >
                      <div className={styles.careerContent}>
                        <Text strong>{career.careername}</Text>
                        <Text type="secondary">{career.description}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default HistoryPage;