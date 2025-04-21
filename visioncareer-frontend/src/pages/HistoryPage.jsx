import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { Card, List } from 'antd';
const API_URL = import.meta.env.VITE_API_URL;

const HistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      {Object.keys(history).length === 0 ? (
        <Card>
          <p>ยังไม่มีประวัติการทำแบบทดสอบ</p>
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
                style={{ marginBottom: 16 }}
              >
                <List
                  dataSource={entry.careers}
                  renderItem={(career) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<strong>{career.careername}</strong>}
                        description={career.description}
                      />
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