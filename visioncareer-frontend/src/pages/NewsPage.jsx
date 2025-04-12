// src/pages/NewsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NewsPage.module.css';

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]); // เพิ่ม state นี้
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // เพิ่ม state นี้
  const navigate = useNavigate();

  // Mock data จากข้อมูล TCAS จริงที่คุณให้มา
  const mockNewsData = [
    // กลุ่มประกาศล่าสุด (ธ.ค. 67 - ก.พ. 68)
    {
      newid: 1,
      title: "เฉลยชื่อสอบ A-Level ประจำปี 2568",
      publishedat: "19 ธ.ค. 68",
      summary: "ประกาศผลสอบ A-Level ปีการศึกษา 2568",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2025/03/20120834/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-61-math1.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121038/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-62-math2.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121108/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-63-sci.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121134/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-64-phy.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121206/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-65-chem.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121232/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-66-bio.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20121255/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-70-soc.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122853/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-81-thai.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122855/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-82-eng.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122857/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-83-fre.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122859/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-84-deu.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122901/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-85-jpn.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122903/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-86-kor.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122905/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-87-chn.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122907/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-88-bal.webp",
        "https://i.mytcas.com/wp-content/uploads/2025/03/20122907/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B9%80%E0%B8%89%E0%B8%A5%E0%B8%A2%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2-88-bal.webp"
      ],
      content: "ประกาศผลสอบ A-Level ประจำปีการศึกษา 2568 สามารถตรวจสอบผลสอบได้ที่เว็บไซต์ mytcas.com ตั้งแต่วันที่ 19 ธันวาคม 2568 เป็นต้นไป"
    },
    {
      newid: 2,
      title: "การบริหารจัดการสิทธิ์ รอบที่ 1 Portfolio",
      publishedat: "3 ก.พ. 68",
      summary: "ประกาศเกี่ยวกับการจัดการสิทธิ์รอบ Portfolio",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2025/02/03105157/475766928_610253964926881_2012894034497657146_n-1024x1024.webp"],
      content: "น้อง ๆ ที่ผ่านการคัดเลือกรอบที่ 1 Portfolio สามารถเข้าระบบมากดยืนยันสิทธิ์ในระบบ TCAS ได้ระหว่างวันที่ 5-6 กุมภาพันธ์ 2568 เปิดระบบวันที่ 5 กุมภาพันธ์ 2568 เวลา 09.00 น. ปิดระบบวันที่ 6 กุมภาพันธ์ 2568 เวลา 23.59 น."
    },
    {
      newid: 3,
      title: "สำหรับผู้สมัครสนามสอบจังหวัดปัตตานี และจังหวัดสงขลาที่แจ้งความประสงค์ขอย้ายวันสอบสำเร็จ",
      publishedat: "6 ธ.ค. 67",
      summary: "แจ้งความประสงค์ของวัฒนธรรมสำเร็จ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215458/469254774_571015102184101_6473526990199603122_n-1024x1024.webp"],
      content: "ประกาศสำหรับผู้สมัครสอบในจังหวัดปัตถานีและสงขลาเกี่ยวกับการแจ้งความประสงค์ทางวัฒนธรรม"
    },
    {
      newid: 4,
      title: "ศูนย์สอบมหาวิทยาลัยอุบลราชธานี แจ้งย้ายสถานที่สอบ TPAT2 และ TPAT5 ในวันที่ 7 ธันวาคม 2567",
      publishedat: "6 ธ.ค. 67",
      summary: "แจ้งความประสงค์ของวัฒนธรรมสำเร็จ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215458/469254774_571015102184101_6473526990199603122_n-1024x1024.webp"],
      content: `ประกาศ📢
      ศูนย์สอบมหาวิทยาลัยอุบลราชธานี แจ้งย้ายสถานที่สอบ TPAT2 และ TPAT5 ในวันที่ 7 ธันวาคม 2567 สำหรับผู้เข้าสอบสนามสอบโรงเรียนเดชอุดม จังหวัดอุบลราชธานี
      ❌ย้ายจากโรงเรียนเดชอุดม
      ✅ไปเข้าสอบที่โรงเรียนอนุบาลนาคสมุทรเดชอุดม
      ผู้เข้าสอบสามารถตรวจสอบการเดินทางได้ตามลิงก์ https://maps.app.goo.gl/42yzSRtSJ7TcFb4b6`
    },
    {
      newid: 5,
      title: "อย่าลืม!! เอกสารสำคัญในการสอบ",
      publishedat: "5 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 6,
      title: "สรุปข้อมูลผู้สมัครสอบ TGAT/TPAT2-5 ที่ได้รับผลกระทบจากสถานการณ์น้ำท่วมภาคใต้ (ข้อมูล ณ วันที่ 5 ธันวาคม 2567)",
      publishedat: "5 ธ.ค. 67",
      summary: "สรุปข้อมูลผู้สมัครสอบ TGAT/TPAT2-5",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215053/469352350_570640242221587_5068766056420030604_n.webp"],
      content: ""
    },
    {
      newid: 7,
      title: "ประกาศ เรื่อง การทบทวนข้อร้องเรียนเพื่อเลื่อนสอบรายวิชา TGAT และ TPAT2-5 จากสถานการณ์น้ำท่วมภาคใต้ตอนล่าง ประกาศ ณ วันที่ 5 ธันวาคม 2567",
      publishedat: "5 ธ.ค. 67",
      summary: "การทบทวนข้อร้องเรียนเพื่อเลื่อนสอบรายวิชา TGAT และ TPAT2-5",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06214820/469013199_570627988889479_7290623844311153416_n-792x1024.webp"],
      content: ""
    },
    {
      newid: 8,
      title: "ข้อปฏิบัติในการเข้าสอบ!!",
      publishedat: "5 ธ.ค. 67",
      summary: "การปฏิบัติในสนามสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06214207/469278801_571038745515070_689587827783242592_n-1024x868.webp"],
      content: ""
    },
    {
      newid: 9,
      title: "รายงานการติดตามสถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่าง ประกาศ ณ วันที่ 4 ธันวาคม 2567 เวลา 21.00น.",
      publishedat: "4 ธ.ค. 67",
      summary: "สถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่าง",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06214022/469205370_569923758959902_623416316770357021_n-724x1024.webp"],
      content: ""
    },
    {
      newid: 10,
      title: "เตรียมพร้อม!! อุปกรณ์สามารถนำเข้าห้องสอบได้",
      publishedat: "3 ธ.ค. 67",
      summary: "อุปกรณ์สามารถนำเข้าห้องสอบได้",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06213721/468939314_566490795969865_6600321237355864866_n-1024x1024.webp"],
      content: ""
    },
    {
      newid: 11,
      title: "รายงานการติดตามสถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่างประกาศ ณ วันที่ 3 ธันวาคม 2567 เวลา 20.00 น.",
      publishedat: "3 ธ.ค. 67",
      summary: "สถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่างประกาศ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06213347/469071199_569244025694542_5371442196348351960_n-724x1024.webp"],
      content: ""
    },
    {
      newid: 12,
      title: "คู่มือการลงทะเบียนย้ายวันสอบ สำหรับผู้สมัครในสนามสอบจังหวัดปัตตานี และจังหวัดสงขลา ที่อาจประสบปัญหาในการเดินทางมาเข้าสอบในวันที่ 7-9 ธันวาคม 2567",
      publishedat: "3 ธ.ค. 67",
      summary: "คู่มือการลงทะเบียนย้ายวันสอบ",
      imageUrls: [ // เปลี่ยนจาก imageUrls เป็น imageUrlss และใช้เป็นอาร์เรย์
        "https://i.mytcas.com/wp-content/uploads/2024/12/06213019/469099598_569585355660409_6503448978943690913_n-1024x1024.webp",
        "https://i.mytcas.com/wp-content/uploads/2024/12/06213021/469198714_569585392327072_9020385587586370168_n-1024x1024.webp"
      ],
      content: ""
    },
    {
      newid: 13,
      title: "สามารถนำอะไรเข้าห้องสอบได้บ้าง?",
      publishedat: "3 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 14,
      title: "ประกาศ การลงทะเบียนเลื่อนสอบ TGAT/TPAT2-5 ในพื้นที่จังหวัดภาคใต้ตอนล่าง",
      publishedat: "2 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 15,
      title: "รายงานการติดตามสถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่างประกาศ ณ วันที่ 2 ธันวาคม 2567 เวลา 20.00 น.",
      publishedat: "2 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 16,
      title: "จะสอบ TGAT/TPAT ต้องเตรียมตัวอย่างไร?",
      publishedat: "1 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 17,
      title: "รายงานการติดตามสถานการณ์ในพื้นที่จังหวัดภาคใต้ตอนล่างประกาศ ณ วันที่ 1 ธันวาคม 2567 เวลา 17.00 น.",
      publishedat: "1 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 18,
      title: "ประกาศชี้แจงการสอบ TGAT/TPAT2-5 ในพื้นที่จังหวัดภาคใต้ตอนล่าง",
      publishedat: "1 ธ.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 19,
      title: "เรื่อง บทลงโทษการกระทำทุจริตการจัดการทดสอบรายวิชาความถนัดทั่วไป (TGAT) และรายวิชาความถนัดทางวิชาการและวิชาชีพ (TPAT) และรายวิชา A-Level ปีการศึกษา 2568",
      publishedat: "28 พ.ย. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 20,
      title: "เนื่องจากสถานการณ์น้ำท่วมภาคใต้ ทำให้ศูนย์สอบมหาวิทยาลัยสงขลานครินทร์งดการทดลองสอบ TGAT/TPAT ด้วย เครื่องคอมพิวเตอร์ (CBT)ในวันเสาร์ที่ 30 พฤศจิกายน 2567",
      publishedat: "27 ส.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 21,
      title: "ประกาศสมาคมที่ประชุมอธิการบดีแห่งประเทศไทย ฉบับที่ 11 ว่าด้วยแนวทางปฏิบัติเกี่ยวกับการดำเนินการทดสอบ พ.ศ. 2568 เพื่อใช้ในระบบการจัดการทดสอบรายวิชาข้อสอบกลางที่ใช้ในการคัดเลือกกลางบุคคลเข้าศึกษา ในสถาบันอุดมศึกษา ปีการศึกษา 2568",
      publishedat: "18 เม.ย. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 22,
      title: "คำชี้แจง ทปอ. ตอบข้อสงสัยเรื่องการประกาศผลคะแนน A-Level 67",
      publishedat: "1 มี.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 23,
      title: "การแต่งกายไปสอบ TGAT/TPAT 2-5 และ A-Level",
      publishedat: "29 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 24,
      title: "อย่าลืม!! บัตรประจำตัวผู้เข้าสอบรายวิชาและบัตรประจำตัวประชาชน",
      publishedat: "10 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 25,
      title: "วันสุดท้าย!! รับสมัคร/ชำระเงิน A-Level",
      publishedat: "7 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 26,
      title: "ยืนยันสิทธิ์ รอบ 1 (Portfolio) วันนี้ปิดระบบ 23.59 น.",
      publishedat: "5 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 27,
      title: "ประกาศผลการคัดเลือกรอบที่ 1 Portfolio และเปิดระบบบริหารจัดการสิทธิ์ วันที่ 6 ก.พ. 2567 เวลา 9:00 น.",
      publishedat: "4 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 28,
      title: "อย่าลืม!! สมัครสอบ A-Level เพื่อใช้ในการสมัครเรียนต่อ มหาวิทยาลัยมหาสารคาม",
      publishedat: "2 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 29,
      title: "การชำระเงินค่าสมัคร A-Level วันที่ 1-10 กุมภาพันธ์ 2567",
      publishedat: "2 ก.พ. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    },
    {
      newid: 30,
      title: "พร้อมแล้ว!! รับสมัครสอบ A-Level เริ่มตั้งแต่วันที่ 1-10 กุมภาพันธ์ 2567",
      publishedat: "15 ม.ค. 67",
      summary: "เอกสารสำคัญในการสอบ",
      imageUrls: ["https://i.mytcas.com/wp-content/uploads/2024/12/06215329/469604679_571209832164628_1674030366182712473_n.webp"],
      content: ""
    }
  ];

  // จำนวนรายการต่อหน้า
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // เรียงลำดับข่าวจากวันที่ล่าสุดไปเก่าสุด
        const sortedNews = [...mockNewsData].sort((a, b) => {
          return new Date(b.publishedat) - new Date(a.publishedat);
        });
        setNewsList(sortedNews);
        setFilteredNews(sortedNews); // ตั้งค่า filteredNews ด้วย
        setLoading(false);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลข่าวสารได้");
        setLoading(false);
        console.error("Error fetching news:", err);
      }
    };

    fetchNews();
  }, []);

    // เพิ่ม useEffect สำหรับการค้นหา
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
      setCurrentPage(1); // รีเซ็ตไปหน้าแรกเมื่อค้นหา
    }, [searchTerm, newsList]);

  const handleNewsClick = (newsItem) => {
    navigate(`/news/${newsItem.newid}`, { state: { news: newsItem } });
  };

  // เปลี่ยนจาก newsList เป็น filteredNews ในส่วนนี้
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ดึงข้อมูลสำหรับหน้าปัจจุบัน
  // const currentNews = newsList.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

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
            placeholder="ค้นหาข่าวสาร"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
        </div>

        <div className={styles.content}>
          {currentNews.map((news) => (
            <div 
              key={news.newid} 
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
                src={news.imageUrls && news.imageUrls.length > 0 ? news.imageUrls[0] : 'https://via.placeholder.com/150?text=No+Image'} 
                alt={news.title} 
                className={styles.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
              <div className={styles.details}>
                <div className={styles.dateBadge}>{news.publishedat}</div>
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