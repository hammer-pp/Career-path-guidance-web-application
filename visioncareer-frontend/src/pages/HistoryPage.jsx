import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const HistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/${user.userid}/recommendation-history`);
        setHistory(res.data.history || {});
      } catch (err) {
        console.error("❌ ไม่สามารถโหลดประวัติผลลัพธ์:", err);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📜 ประวัติผลลัพธ์แบบทดสอบ</h2>
      {Object.keys(history).length === 0 ? (
        <p>ยังไม่มีประวัติการทำแบบทดสอบ</p>
      ) : (
        Object.entries(history).map(([testid, entry]) => (
          <div key={testid} style={{ marginBottom: "2rem" }}>
            <h4>🧪 แบบทดสอบเมื่อ: {new Date(entry.createdat).toLocaleString()}</h4>
            <ul>
              {entry.careers.map((career) => (
                <li key={career.careerid}>
                  <strong>{career.careername}</strong>: {career.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPage;
