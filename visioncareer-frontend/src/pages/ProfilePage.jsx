import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    dateofbirth: "",
    gender: "",
    createdat: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${user.userid}`);
        setForm({ ...res.data, password: "", confirmPassword: "" });
      } catch (err) {
        console.error("❌ ไม่สามารถโหลดข้อมูลผู้ใช้:", err);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      alert("❗️ รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const { confirmPassword, ...submitForm } = form;
      await axios.put(`${API_URL}/users/${user.userid}`, submitForm);
      alert("✅ บันทึกข้อมูลเรียบร้อยแล้ว");
      setIsEditing(false);
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  const inputStyle = {
    padding: "0.5rem",
    width: "100%",
    maxWidth: "300px",
    marginTop: "4px"
  };

  const labelStyle = {
    fontWeight: "bold",
    display: "block",
    marginBottom: "0.3rem"
  };

  const sectionStyle = {
    marginBottom: "1.2rem"
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>👤 โปรไฟล์ผู้ใช้</h2>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)} style={{ marginBottom: "1rem" }}>
          ✏️ แก้ไขข้อมูล
        </button>
      )}
      {[
        { label: "ชื่อ-นามสกุล", name: "fullname", type: "text" },
        { label: "อีเมล", name: "email", type: "email" },
        { label: "เบอร์โทรศัพท์", name: "phonenumber", type: "text" },
        { label: "วันเกิด", name: "dateofbirth", type: "date" },
        { label: "เพศ", name: "gender", type: "select" }
      ].map(({ label, name, type }) => (
        <div style={sectionStyle} key={name}>
          <label style={labelStyle}>{label}</label>
          {type === "select" ? (
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              style={inputStyle}
              disabled={!isEditing}
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={
                type === "date" && form[name]
                  ? form[name].split("T")[0]
                  : form[name] || ""
              }
              onChange={handleChange}
              style={inputStyle}
              disabled={!isEditing}
            />
          )}
        </div>
      ))}

      {isEditing && (
        <>
          <div style={sectionStyle}>
            <label style={labelStyle}>รหัสผ่านใหม่</label>
            <input
              type="password"
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={sectionStyle}>
            <label style={labelStyle}>ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <button onClick={handleSave} style={{ marginRight: "1rem" }}>💾 บันทึก</button>
          <button onClick={() => setIsEditing(false)}>❌ ยกเลิก</button>
        </>
      )}

      <div style={{ marginTop: "2rem", color: "gray" }}>
        <label style={labelStyle}>สร้างเมื่อ</label>
        <span>{form.createdat ? new Date(form.createdat).toLocaleString() : "-"}</span>
      </div>
    </div>
  );
};

export default ProfilePage;