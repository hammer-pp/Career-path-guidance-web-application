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
  { question: "คุณชอบทดสอบคุณภาพชิ้นส่วนอุปกรณ์", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบงานก่ออิฐก่อสร้าง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบทำงานบนแท่นขุดเจาะน้ำมันนอกชายฝั่ง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบประกอบชิ้นส่วนอิเล็กทรอนิกส์", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบควบคุมเครื่องจักรหนัก", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบงานประปา", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบประกอบผลิตภัณฑ์ในโรงงาน", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  { question: "คุณชอบงานติดตั้งพื้น ปูกระเบื้อง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
  {
    
    question: "คุณชอบศึกษาหลักการโครงสร้างของร่างกายมนุษย์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
 
    question: "คุณชอบศึกษาพฤติกรรมของสัตว์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "คุณชอบทำวิจัยเกี่ยวกับพืชหรือสัตว์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "คุณชอบพัฒนาวิธีการรักษาทางการแพทย์ใหม่",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบดำเนินการวิจัยทางชีววิทยา",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "คุณชอบศึกษาสิ่งมีชีวิตในทะเล",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
  
    question: "คุณชอบทำงานในห้องปฏิบัติการชีววิทยา",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบทำแผนที่พื้นมหาสมุทร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบควบคุมวงนักร้องประสานเสียง",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบกำกับการแสดงละคร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบออกแบบงานศิลปะสำหรับนิตยสาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบแต่งเพลง",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบเขียนหนังสือหรือละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบเล่นเครื่องดนตรี",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบแสดงละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    question: "คุณชอบออกแบบฉากสำหรับละครเวที",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบให้คำแนะนำด้านอาชีพแก่ผู้อื่น",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบทำงานอาสาสมัครในองค์กรไม่แสวงหาผลกำไร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบช่วยเหลือผู้ที่มีปัญหายาเสพติดหรือแอลกอฮอล์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบเปิดสอนเกี่ยวกับการออกกำลังกาย",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบช่วยเหลือผู้คนที่มีปัญหาครอบครัว",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบดูแลและกำกับกิจกรรมของเด็กในค่าย",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบสอนเด็กเล็ก",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบช่วยเหลือผู้สูงอายุในกิจวัตรประจำวัน",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบทำแฟรนไชส์ร้านอาหาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบขายสินค้าในห้างสรรพสินค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบบริหารจัดการโรงแรม",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบทำกิจการร้านเสริมสวยหรือตัดผม",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบเป็นผู้จัดการในบริษัทขนาดใหญ่",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบทำร้านขายเสื้อผ้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบนายหน้าอสังหาริมทรัพย์",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบทำร้านขายของเล่น",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบทำบัญชี",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบนับสต็อกสินค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    question: "คุณชอบทำโปรแกรมคอมพิวเตอร์เพื่อออกใบเรียกเก็บเงินให้ลูกค้า",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
   
    question: "คุณชอบดูแลบันทึกข้อมูลพนักงาน",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบคำนวณและบันทึกข้อมูลทางสถิติและตัวเลข",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบใช้เครื่องคิดเลข",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบดำเนินการทำธุรกรรมทางการเงินของลูกค้ากับธนาคาร",
    options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] ,
  },
  {
    
    question: "คุณชอบจัดเก็บบันทึกข้อมูลการจัดส่งและรับสินค้า",
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
  const [personalityAnswers, setPersonalityAnswers] = useState({}); // เก็บคำตอบชุดที่ 1
  const [interestAnswers, setInterestAnswers] = useState({}); // เก็บคำตอบชุดที่ 2

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

  // รายการข้อที่ต้องแปลงเป็นค่าติดลบ (index เริ่มจาก 0)
  const negativeScoreQuestions = [1, 3, 6, 8, 10, 13, 15, 21, 22, 23, 25]; // ข้อที่ 2, 4, 7, 9, 11, 14, 16, 22, 23, 24, 26

  // แปลงข้อความเป็นคะแนน
  const getScoreFromOption = (option) => {
    return option === "ชอบอย่างมาก" || option === "เห็นด้วยอย่างมาก" ? 5 :
           option === "ชอบ" || option === "เห็นด้วย" ? 4 :
           option === "เฉยๆ" ? 3 :
           option === "ไม่ชอบ" || option === "ไม่เห็นด้วย" ? 2 :
           option === "ไม่ชอบอย่างมาก" || option === "ไม่เห็นด้วยอย่างมาก" ? 1 : 0;
  };

  // จัดการการเลือกคำตอบ
  const handleAnswer = (answer, questionIndex) => {
    let score = getScoreFromOption(answer);

    // ถ้าข้อคำถามเป็นข้อที่ต้องติดลบ ให้เปลี่ยนค่าเป็นติดลบ
    if (step === 1 && negativeScoreQuestions.includes(questionIndex)) {
      score = -score;
    }

    if (step === 1) {
      setPersonalityAnswers((prev) => ({ ...prev, [questionIndex]: score }));
    } else if (step === 2) {
      setInterestAnswers((prev) => ({ ...prev, [questionIndex]: score }));
    }
  };

  // ตรวจสอบว่าผู้ใช้ตอบคำถามครบทุกข้อในชุดนั้น ๆ
  const checkAllAnswers = (questions, answers) => {
    return questions.every((_, index) => answers[index] !== undefined);
  };

  // เมื่อผู้ใช้ตอบคำถามครบทั้งชุด
  const handleCompleteTest = (questions, answers) => {
    if (checkAllAnswers(questions, answers)) {
      console.log("คำตอบทั้งหมด:", answers);
      // คุณสามารถทำอะไรต่อได้ที่นี่ เช่น ส่งคำตอบไปยัง backend หรือแสดงผลลัพธ์
    }
  };

  // ฟังก์ชันสำหรับการย้อนกลับ
  const handleBack = () => {
    if (currentQuestionIndex >= 3) {
      setCurrentQuestionIndex(currentQuestionIndex - 3);
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
          {/* Step 0.5: หน้าคั่นก่อนเริ่มทำแบบทดสอบบุคลิกภาพ */}
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
              <div style={styles.descriptionText1}>ขั้นตอนถัดไป</div>
              <div style={styles.text}>ค้นหาความชอบที่คุณสนใจ</div>
              <div style={styles.descriptionText}>
                เราจะแสดงสถานการณ์แบบสุ่มเพื่อช่วยให้เราทราบตัวตนของคุณมากขึ้น
              </div>
              <div style={styles.buttonContainer2}>
                <Button type="primary" style={styles.button2} onClick={startInterestTest}>
                  <span>เริ่มต้นแบบทดสอบความสนใจ</span>
                </Button>
              </div>
            </>
          )}

          {/* Step 1 & 2: หน้าคำถาม */}
          {(step === 1 || step === 2) && (
            <div style={styles.questionContainer}>
              <div style={styles.titletext}>
                {/* คำถามที่ {currentQuestionIndex + 1} - {currentQuestionIndex + 3} */}
                {/*  / {step === 1 ? personalityQuestions.length : interestQuestions.length} */}
              </div>
              {[0, 1, 2].map((offset) => {
                const questionIndex = currentQuestionIndex + offset;
                const question = step === 1
                  ? personalityQuestions[questionIndex]
                  : interestQuestions[questionIndex];

                if (!question) return null; // ถ้าไม่มีคำถามให้ข้าม

                return (
                  <div key={questionIndex} style={styles.questionBlock}>
                    <div style={styles.textquestion}>
                      {question.question}
                    </div>
                    <div style={styles.optionsContainer}>
                      <div style={styles.optionLabelLeft}>ไม่เห็นด้วย</div>
                      {question.options.map((option, index) => {
                        const score = getScoreFromOption(option);
                        const answers = step === 1 ? personalityAnswers : interestAnswers;
                        return (
                          <Button
                            className="custom-button"
                            key={index}
                            style={{
                              ...styles.optionButton,
                              ...(index === 0 ? styles.optionButtonLarge : {}),
                              ...(index === 1 ? styles.optionButtonMedium : {}),
                              ...(index === 2 ? styles.optionButtonSmall : {}),
                              ...(index === 3 ? styles.optionButtonMedium : {}),
                              ...(index === 4 ? styles.optionButtonLarge : {}),
                              border: `4.5px solid ${
                                index < 2
                                  ? "#E4815A" // ปุ่มซ้ายสองตัว (ส้ม)
                                  : index === 2
                                  ? "#CCCCCC" // ปุ่มตรงกลาง (เทา)
                                  : "#0180CC" // ปุ่มขวาสองตัว (น้ำเงิน)
                              }`,
                              ...(Math.abs(answers[questionIndex]) === score
                              ? { backgroundColor: index < 2 ? "#E4815A" : index === 2 ? "#CCCCCC" : "#0180CC" }
                              : {}),
                            }}
                            onClick={() => handleAnswer(option, questionIndex)}
                          >
                            {/* {option} */}
                          </Button>
                        );
                      })}
                      <div style={styles.optionLabelRight}>เห็นด้วย</div>
                    </div>
                  </div>
                );
              })}
              {/* เพิ่มปุ่ม "ย้อนกลับ" และ "ถัดไป" */}
              <div style={styles.buttonContainer}>
                <Button
                  type="primary"
                  style={styles.backButton}
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                >
                  ย้อนกลับ
                </Button>
                <Button
                  type="primary"
                  style={styles.nextButton}
                  onClick={() => {
                    if (step === 1) {
                      if (currentQuestionIndex + 3 < personalityQuestions.length) {
                        setCurrentQuestionIndex(currentQuestionIndex + 3);
                      } else {
                        setStep(1.5);
                        handleCompleteTest(personalityQuestions, personalityAnswers);
                      }
                    } else if (step === 2) {
                      if (currentQuestionIndex + 3 < interestQuestions.length) {
                        setCurrentQuestionIndex(currentQuestionIndex + 3);
                      } else {
                        setStep(3);
                        handleCompleteTest(interestQuestions, interestAnswers);
                      }
                    }
                  }}
                  disabled={
                    ![0, 1, 2].every((offset) => {
                      const questionIndex = currentQuestionIndex + offset;
                      const answers = step === 1 ? personalityAnswers : interestAnswers;
                      return answers[questionIndex] !== undefined;
                    })
                  }
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ด้านขวาของหน้าจอ */}
        <div style={{ ...styles.rightBox, padding: "55px", paddingLeft: "70px" }}>
          <Steps
            direction="vertical"
            current={step >= 3 ? 4 : step} // ถ้าจบแบบทดสอบแล้วไป Step 4
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
    wordWrap: "break-word",
  },
  textquestion: {
    color: "black",
    fontSize: "35px",
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: 400,
    wordWrap: "break-word",
    marginBottom:"25px",
    marginLeft:"25px",
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
    flexDirection: 'row', // จัดเรียงปุ่มในแนวนอน
    justifyContent: 'center', // จัดให้อยู่กลางแนวนอน
    alignItems: 'center', // จัดให้อยู่กลางแนวตั้ง
    gap: '10px', // ระยะห่างระหว่างปุ่ม
    width: '100%', // ให้ความกว้างเต็มพื้นที่
    marginTop: '20px', // ระยะห่างจากด้านบน
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
  questionBlock: {
    marginBottom: '30px', // เพิ่มระยะห่างระหว่างคำถาม
    padding: '10px', // ให้พื้นที่ภายใน
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    marginLeft: '-80px',
  },
  
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // จัดให้อยู่ตรงกลาง
    alignItems: 'center',
    gap: '15px', // เพิ่มระยะห่างระหว่างปุ่ม
    width: '100%',
    marginTop: '15px', // เพิ่มระยะห่างจากคำถาม
  },
  
  optionButton: {
    width: '50px', // ปรับขนาดปุ่มให้เป็นวงกลม
    height: '50px', // ปรับขนาดปุ่มให้เป็นวงกลม
    borderRadius: '50%', // ทำให้ปุ่มเป็นวงกลม
    // border: '1px solid #0180cc', // เพิ่มเส้นขอบ
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out', // เพิ่มการเปลี่ยนสีเมื่อเลือก
  },
  optionButtonLarge: {
    width: '80px', // ปุ่มใหญ่
    height: '80px', // ปุ่มใหญ่
    marginTop: '-20px',
    // border: '2.5px solid #E4815A', // เพิ่มเส้นขอบ
  },
  optionButtonMedium: {
    width: '60px', // ปุ่มกลาง
    height: '60px', // ปุ่มกลาง
    marginTop: '-20px',
    // border: '1px solid #0180cc', // เพิ่มเส้นขอบ
  },
  optionButtonSmall: {
    // width: '40px', // ปุ่มเล็ก
    // height: '40px', // ปุ่มเล็ก
    marginTop: '-20px',
    borderRadius: "50%", // ทำให้เป็นวงกลม
    // border: "2px solid #0180cc", // เพิ่มเส้นขอบ
    display: "flex", // ให้เนื้อหาตรงกลาง
    alignItems: "center", // จัดให้อยู่กึ่งกลางแนวตั้ง
    justifyContent: "center", // จัดให้อยู่กึ่งกลางแนวนอน
    // border: '1px solid #0180cc', // เพิ่มเส้นขอบ
  },
  // optionButtonSelected: {
  //   backgroundColor: '#0180CC', // สีเมื่อเลือก
  //   color: 'black', // สีข้อความเมื่อเลือก
  // },
  // optionLabel: {
  //   fontSize: '14px',
  //   fontFamily: "'Noto Sans Thai', sans-serif",
  //   fontWeight: '400',
  //   color: 'black',
  // },
  optionLabelLeft: {
    fontSize: '24px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: '400',
  
    marginRight: '10px', // ระยะห่างระหว่างข้อความกับปุ่มทางซ้าย
    color: '#E4815A',

  },
  optionLabelRight: {
    fontSize: '24px',
    fontFamily: "'Noto Sans Thai', sans-serif",
    fontWeight: '400',
   
    marginLeft: '10px', // ระยะห่างระหว่างข้อความกับปุ่มทางขวา
    color: '#0180CC',
  },

  nextButton: {
    background: 'linear-gradient(90deg, #E4815A 0%, #F9D423 100%)',
    color: 'white',
    width: '180px',
    height: '55px',
    borderRadius: '15px',
    border:'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'row',  // ให้ปุ่มเรียงในแนวนอน
    justifyContent: 'center',
    // marginTop: '20px',
  },
  
  backButton: {
    background: '#ffffff',
    color: 'black',
    width: '180px',
    height: '55px',
    borderRadius: '15px',
    
    fontSize: '20px',
    display: 'flex',
    // flexDirection: 'row',  // ให้ปุ่มเรียงในแนวนอน
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '-140px',
    border: "1px solid #ccc", // เพิ่มขอบให้ดูชัดเจน
  },
};

export default TestPage;