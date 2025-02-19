// src/pages/TestPage.jsx
import React, { useState } from 'react';
import { Button, Steps } from 'antd';
import '../App.css';

const { Step } = Steps;

const stepTitleStyle = {
  color: "black",
  fontSize: "24px",
  fontFamily: "'Noto Sans Thai', sans-serif",
  fontWeight: 400,
  wordWrap: "break-word",
};

const stepDescriptionStyle = {
  color: "black",
  fontSize: "12px",
  fontFamily: "'Noto Sans Thai', sans-serif",
  fontWeight: 400,
  wordWrap: "break-word",
};

const stepDescriptionStyle2 = {
  color: "black",
  fontSize: "17px",
  fontFamily: "'Noto Sans Thai', sans-serif",
  fontWeight: 100,
  wordWrap: "break-word",
};
// สร้างข้อมูลคำถาม (ความชอบ 48 ข้อ)
const interestQuestions = [
  { question: "ทดสอบคุณภาพชิ้นส่วนอุปกรณ์", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "งานก่ออิฐก่อสร้าง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "ทำงานบนแท่นขุดเจาะน้ำมันนอกชายฝั่ง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "ประกอบชิ้นส่วนอิเล็กทรอนิกส์", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "ควบคุมเครื่องจักรหนัก", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "งานประปา", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "ประกอบผลิตภัณฑ์ในโรงงาน", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "งานติดตั้งพื้น ปูกระเบื้อง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  {
    
    question: "ศึกษาหลักการโครงสร้างของร่างกายมนุษย์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
 
    question: "ศึกษาพฤติกรรมของสัตว์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "ทำวิจัยเกี่ยวกับพืชหรือสัตว์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "พัฒนาวิธีการรักษาทางการแพทย์ใหม่",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ดำเนินการวิจัยทางชีววิทยา",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "ศึกษาสิ่งมีชีวิตในทะเล",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "ทำงานในห้องปฏิบัติการชีววิทยา",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ทำแผนที่พื้นมหาสมุทร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ควบคุมวงนักร้องประสานเสียง",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "กำกับการแสดงละคร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ออกแบบงานศิลปะสำหรับนิตยสาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "แต่งเพลง",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "เขียนหนังสือหรือละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "เล่นเครื่องดนตรี",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "แสดงละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    question: "ออกแบบฉากสำหรับละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ให้คำแนะนำด้านอาชีพแก่ผู้อื่น",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ทำงานอาสาสมัครในองค์กรไม่แสวงหาผลกำไร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ช่วยเหลือผู้ที่มีปัญหายาเสพติดหรือแอลกอฮอล์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "เปิดสอนเกี่ยวกับการออกกำลังกาย",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ช่วยเหลือผู้คนที่มีปัญหาครอบครัว",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ดูแลและกำกับกิจกรรมของเด็กในค่าย",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "สอนเด็กเล็ก",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ช่วยเหลือผู้สูงอายุในกิจวัตรประจำวัน",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ทำแฟรนไชส์ร้านอาหาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ขายสินค้าในห้างสรรพสินค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "บริหารจัดการโรงแรม",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ทำกิจการร้านเสริมสวยหรือตัดผม",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "เป็นผู้จัดการในบริษัทขนาดใหญ่",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ทำร้านขายเสื้อผ้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "นายหน้าอสังหาริมทรัพย์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ทำร้านขายของเล่น",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ทำบัญชี",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "นับสต็อกสินค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    question: "ทำโปรแกรมคอมพิวเตอร์เพื่อออกใบเรียกเก็บเงินให้ลูกค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "ดูแลบันทึกข้อมูลพนักงาน",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คำนวณและบันทึกข้อมูลทางสถิติและตัวเลข",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ใช้เครื่องคิดเลข",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "ดำเนินการทำธุรกรรมทางการเงินของลูกค้ากับธนาคาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "จัดเก็บบันทึกข้อมูลการจัดส่งและรับสินค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  }

  // ... เพิ่มอีกจนถึงข้อ 48
];

// คำถามชุดที่ 2 (บุคลิกภาพ) - 33 ข้อ
const personalityQuestions = [
  { question: "คุณมีชีวิตชีวาในงานปาร์ตี้", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณไม่ค่อยพูดมาก", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณรู้สึกสบายใจเมื่ออยู่กับผู้คน", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณมักจะอยู่เบื้องหลัง", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเป็นคนเริ่มบทสนทนา", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณพูดคุยกับผู้คนหลากหลายที่งานปาร์ตี้", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณไม่ชอบเป็นจุดสนใจ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเครียดง่าย", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณรู้สึกผ่อนคลายเป็นส่วนใหญ่", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณกังวลเกี่ยวกับสิ่งต่าง ๆ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณแทบไม่เคยรู้สึกเศร้า", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณอารมณ์เสียได้ง่าย", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเปลี่ยนอารมณ์บ่อย", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณไม่ค่อยสนใจความรู้สึกของผู้อื่น", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณสนใจผู้คน", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณดูถูกผู้อื่น", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเห็นอกเห็นใจความรู้สึกของผู้อื่น", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเป็นคนใจอ่อน", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณสละเวลาช่วยเหลือผู้อื่น", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณทำให้ผู้คนรู้สึกสบายใจ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเตรียมพร้อมอยู่เสมอ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณวางของเกะกะไปทั่ว", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณมักทำให้สิ่งต่าง ๆ ยุ่งเหยิง", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณมักลืมเก็บของเข้าที่", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณชอบความเป็นระเบียบ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณหลีกเลี่ยงหน้าที่ของตัวเอง", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณทำงานตามตารางเวลาที่กำหนด", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณทำงานอย่างละเอียดถี่ถ้วน", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณสามารถใช้คำศัพท์ที่หลากหลาย", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเข้าใจแนวคิดเชิงนามธรรมได้ยาก", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณมีจินตนาการ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเข้าใจสิ่งต่าง ๆ ได้อย่างรวดเร็ว", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
  { question: "คุณเต็มไปด้วยไอเดียใหม่ ๆ", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },


  // ... เพิ่มอีกจนถึงข้อ 50
];


const TestPage = () => {
  const [step, setStep] = useState(0); // ควบคุม Step
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // เริ่มต้นแบบทดสอบ
  const startTest = () => {
    setStep(0.5); // ไปที่ "เอกลักษณ์บุคลิกภาพของคุณ"
  };

  const startTestper = () => {
    setStep(1); // ไปที่ "เอกลักษณ์บุคลิกภาพของคุณ"
  };

  // เริ่มต้นแบบทดสอบชุดที่ 2 (ค้นหาความชอบ)
  const startInterestTest = () => {
    setStep(2); // ไปที่ "คุณลักษณะที่น่าสนใจของคุณ"
    setCurrentQuestionIndex(0); // รีเซ็ตค่า index
  };

  // จัดการการเลือกคำตอบ
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    // ตรวจสอบว่าทำแบบทดสอบครบหรือยัง
    if (step === 1) {
      if (currentQuestionIndex < personalityQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStep(1.5); // แสดงหน้าคั่นก่อนเริ่มเทสชุด 2
      }
    } else if (step === 2) {
      if (currentQuestionIndex < interestQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStep(3); // ไปที่ "รวมต้นแบบบุคลิกภาพของคุณ"
        console.log("แบบทดสอบเสร็จแล้ว", newAnswers);
      }
    }
  };

  return (
    <main style={styles.content}>
      <div style={styles.contentContainer}>
        {/* ด้านซ้าย */}
        <div style={styles.textContainer}>
          {/* Step 0: หน้าเริ่มต้น */}
          {step === 0 && (
            <>
              <div style={styles.text}>ยินดีต้อนรับสู่ VisionCareer</div>
              <div style={styles.descriptionText}>
                ทำแบบทดสอบเพียงไม่ถึง 30 นาที ค้นพบเส้นทางอนาคตที่เหมาะกับคุณได้ทันที
              </div>
              <div style={styles.buttonContainer2}>
              <Button type="primary" style={styles.button} onClick={startTest}>
                <span>เริ่มต้นการทดสอบบุคลิกภาพ</span>
              </Button>
              </div>
            </>
          )}
        {/* ✅ Step 0.5: หน้าคั่นก่อนเริ่มทำแบบทดสอบบุคลิกภาพ */}
        {step === 0.5 && (
          <>
            <div style={styles.descriptionText1}>ขั้นตอนแรก</div>
            <div style={styles.text}>ค้นหาตัวตนที่แท้จริงของคุณ</div>
            <div style={styles.descriptionText2}>
              เราจะแสดงสถานการณ์แบบสุ่มเพื่อช่วยให้เราทราบตัวตนของคุณมากขึ้น
            </div>
            <div style={styles.buttonContainer2}>
              <Button type="primary" style={styles.button2} onClick={startTestper}>
                <span>เริ่มต้นแบบทดสอบบุคลิกภาพ</span>
              </Button>
            </div>
          </>
        )}
          {/* Step 1.5: หน้าอธิบายก่อนเริ่มเทสชุดที่ 2 */}
          {step === 1.5 && (
            <>
              <div style={styles.descriptionText1}>
                ขั้นตอนถัดไป
                </div>
              <div style={styles.text}>ค้นหาความชอบที่คุณสนใจ</div>
              <div style={styles.descriptionText}>
                เราจะแสดงสถานการณ์แบบสุ่มเพื่อช่วยให้เราทราบตัวตนของคุณมากขึ้น
              </div>
              <div style={styles.buttonContainer2}>
              <Button type="primary" style={styles.button2} onClick={startInterestTest}>
                <span>เริ่มต้นแบบทดสอบความี่สนใจ</span>
              </Button>
              </div>
            </>
          )}

          {/* Step 1 & 2: หน้าคำถาม */}
          {(step === 1 || step === 2) && (
            <div style={styles.questionContainer}>
              <div style={styles.titletext}>
                คำถามที่ {currentQuestionIndex + 1} / {step === 1 ? personalityQuestions.length : interestQuestions.length}
              </div>
              <div style={styles.textquestion}>
                {step === 1
                  ? personalityQuestions[currentQuestionIndex].question
                  : interestQuestions[currentQuestionIndex].question}
              </div>
              <div style={styles.optionsContainer}>
                {(step === 1
                  ? personalityQuestions[currentQuestionIndex].options
                  : interestQuestions[currentQuestionIndex].options
                ).map((option, index) => (
                  <Button className="custom-button" key={index} style={styles.optionButton} onClick={() => handleAnswer(option)}>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ด้านขวาของหน้าจอ */}
        <div style={{ ...styles.rightBox, padding: "55px", paddingLeft: "70px" }}>
          <Steps
            direction="vertical"
            current={step >= 3 ? 4 : step} // ถ้าจบแบบทดสอบแล้วไป Step 4  รอใส่โมเดล MLLLLLLLLLLLLLLLL
            items={[
              { title: <div style={stepTitleStyle}>เริ่มต้นการใช้งาน</div>, description: <div style={stepDescriptionStyle}>~ 1นาที</div> },
              { title: <div style={stepTitleStyle}>เอกลักษณ์บุคลิกภาพของคุณ</div>, description: <div style={stepDescriptionStyle}>~ 10 นาที</div> },
              { title: <div style={stepTitleStyle}>คุณลักษณะที่น่าสนใจของคุณ</div>, description: <div style={stepDescriptionStyle}>~ 10 นาที</div> },
              { title: <div style={stepTitleStyle}>รวมต้นแบบบุคลิกภาพของคุณ</div>, description: <div style={stepDescriptionStyle}>{'< 5 นาที'}</div> },
              { title: <div style={stepTitleStyle}>ผลลัพธ์ของคุณ</div>, description: <div style={stepDescriptionStyle2}>~ 3 นาที<br/>รายงานบุคลิกภาพ</div> },
            ]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </main>
  );
};


const styles = {
  content: {
    display: "flex",
    height: "87.5vh", // ให้พื้นที่ของหน้าจอเต็มความสูง
    // flex: 1,
    // padding: "2rem",
    margin: 0,
  },
  contentContainer: {
    display: "flex",
    width: "100%", // ใช้ความกว้างเต็มหน้าจอ
    background: "linear-gradient(90deg, #0357AF 0%, white 100%)",
  },
  textContainer: {
    flex: 2, // ให้พื้นที่ซ้ายกิน 2/3 ของหน้าจอ
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: '20px',
    paddingLeft: "100px",
  },
  text: {
    color: "black",
    fontSize: "52px",
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
    wordWrap: "break-word",
    lineHeight: "1.2",
  },
  titletext: {
    color: "black",
    fontSize: "24px",
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    // textTransform: "uppercase",
    wordWrap: "break-word",
    // lineHeight: "1.2",
  },
  textquestion: {
    color: "black",
    fontSize: "40px",
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    // textTransform: "uppercase",
    wordWrap: "break-word",
    // lineHeight: "1.2",
  },
  descriptionText: {
    width: '672px',
    marginTop: '35px',
    color: 'black',
    fontSize: '24px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    wordWrap: 'break-word',
  },
  descriptionText1: {
    width: '672px',
    marginTop: '-50px',
    color: 'black',
    fontSize: '24px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    wordWrap: 'break-word',
  },
  descriptionText2: {
    width: 'auto',
    marginTop: '25px',
    
    color: 'black',
    fontSize: '24px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    wordWrap: 'break-word',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '50px',
  },
  buttonContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '50px',
    
  },
  button: {
    background: 'linear-gradient(90deg, #E4815A 0%, #F9D423 100%)',
    color: 'white',
    width: '250px',
    height: '90px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '20px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 16px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  button2: {
    background: 'white',
    color: 'black',
    width: '500px',
    height: '70px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '20px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 10px 16px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  rightBox: {
    flex: 1, // ให้พื้นที่ขวากิน 1/3 ของหน้าจอ
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  questionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};

export default TestPage;
