import { Button, Steps } from 'antd';
import styles from '../styles/TestPage.module.css';
import { personalityQuestions, interestQuestions } from '../data/questions';
import AuthContext from "./AuthContext";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { predictAnswers } from "../api";

const FLASK_URL = import.meta.env.VITE_FLASK_URL;
const API_URL = import.meta.env.VITE_API_URL || "/api";

const { Step } = Steps;

const TestPage = () => {
  const { user } = useContext(AuthContext);
  const [answers, setAnswers] = useState(Array(81).fill(0));
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [interestAnswers, setInterestAnswers] = useState({});

  const [careers, setCareers] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [selectedCareerName, setSelectedCareerName] = useState("");
  const [majors, setMajors] = useState([]);
  const [majorDetail, setMajorDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const startTest = () => setStep(0.5);
  const startTestper = () => setStep(1);
  const startInterestTest = () => {
    setStep(2);
    setCurrentQuestionIndex(0);
  };

  const negativeScoreQuestions = [1, 3, 6, 8, 10, 13, 15, 21, 22, 23, 25];

  const getScoreFromOption = (option) => {
    return option === "ชอบอย่างมาก" || option === "เห็นด้วยอย่างมาก" ? 5 :
           option === "ชอบ" || option === "เห็นด้วย" ? 4 :
           option === "เฉยๆ" ? 3 :
           option === "ไม่ชอบ" || option === "ไม่เห็นด้วย" ? 2 :
           option === "ไม่ชอบอย่างมาก" || option === "ไม่เห็นด้วยอย่างมาก" ? 1 : 0;
  };

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  // ฟังก์ชันส่งคำตอบทั้งหมดไปประมวลผล
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    // รวมคำตอบทั้งหมด (index 0-80)
    const combinedAnswers = {
      ...personalityAnswers,
      ...Object.fromEntries(
        Object.entries(interestAnswers).map(([key, value]) => [parseInt(key) + 33, value])
      ),
    };
    const combinedArray = Array(81).fill(0).map((_, idx) => combinedAnswers[idx]);

    if (combinedArray.length !== 81 || combinedArray.includes(undefined)) {
      alert("กรุณาทำแบบทดสอบให้ครบทุกข้อ");
      setLoading(false);
      return;
    }

    try {
      // 1. ส่งไป Flask /predict
      const predictRes = await fetch(`${FLASK_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: combinedArray,
          user_id: user?.userid || null,
        }),
      });
      const predictData = await predictRes.json();
      if (!predictRes.ok || predictData.error) throw new Error(predictData?.error || "เกิดข้อผิดพลาดจากการประมวลผล");

      const { holland_group, big5_group } = predictData;

      // 2. หาอาชีพที่เหมาะสมจาก Node.js
      const mapRes = await fetch(`${API_URL}/get-mapped-careers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          holland_group,
          big5_group,
        }),
      });
      const mapData = await mapRes.json();
      if (!mapRes.ok || mapData.error) throw new Error(mapData.error || "ดึงข้อมูลอาชีพล้มเหลว");

      // ถ้ามี career_ids ค่อย fetch รายละเอียด
      let careerObjects = [];
      if (Array.isArray(mapData.career_ids) && mapData.career_ids.length > 0) {
        const careersRes = await fetch(`${API_URL}/careers/all?ids=${mapData.career_ids.join(",")}`);
        careerObjects = await careersRes.json();
        setCareers(careerObjects);
      } else {
        setCareers([]);
      }

      // 3. ถ้ามี user → save-test และ save recommendations
      if (user?.userid) {
        // save-test (รับ testid กลับมา)
        const saveTestRes = await fetch(`${API_URL}/save-test`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.userid,
            answers: combinedArray,
            holland_group,
            big5_group,
          }),
        });
        const testData = await saveTestRes.json();
        if (!saveTestRes.ok || testData.error) throw new Error(testData.error || "บันทึกแบบทดสอบไม่สำเร็จ");

        // save recommendations
        await fetch(`${API_URL}/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.userid,
            testid: testData.testid,
            careerids: mapData.career_ids,
          }),
        });
      }

      setResult({
        holland_group,
        big5_group,
      });
      setStep(3);
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
    setLoading(false);
  };

  const fetchRecommendedCareers = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/${user.userid}/recommended-careers`);
      setCareers(res.data.careers);
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดอาชีพที่แนะนำ:", err);
    }
  };

  const fetchMajors = async (careerId, careerName) => {
    setSelectedCareerId(careerId);
    setSelectedCareerName(careerName);
    setMajorDetail(null);
    try {
      const res = await axios.get(`${API_URL}/careers/${careerId}/majors`);
      setMajors(res.data.majors);
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดสาขา:", err);
    }
  };

  const fetchMajorDetail = async (majorId) => {
    try {
      const res = await axios.get(`${API_URL}/majors/${majorId}/detail`);
      setMajorDetail(res.data);
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดรายละเอียดสาขา:", err);
    }
  };

  useEffect(() => { if (user) { fetchRecommendedCareers(); } }, [user]);

  const handleAnswer = (answer, questionIndex) => {
    let score = getScoreFromOption(answer);
    if (step === 1 && negativeScoreQuestions.includes(questionIndex)) score = -score;
    if (step === 1) {
      setPersonalityAnswers(prev => ({ ...prev, [questionIndex]: score }));
    } else if (step === 2) {
      setInterestAnswers(prev => ({ ...prev, [questionIndex]: score }));
    }
  };

  const checkAllAnswers = (questions, answers) => {
    return questions.every((_, index) => answers[index] !== undefined);
  };

  const handleCompleteTest = (questions, answers) => {
    if (checkAllAnswers(questions, answers)) {
      console.log("คำตอบทั้งหมด:", answers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex >= 3) {
      setCurrentQuestionIndex(currentQuestionIndex - 3);
    }
  };

  return (
    <main className={styles.content}>
      <div className={styles.contentContainer}>
        {/* ด้านซ้าย */}
        <div className={styles.textContainertest}>
          {/* Step 0: หน้าเริ่มต้น */}
          {step === 0 && (
            <>
              <div className={styles.text}>ยินดีต้อนรับสู่ VisionCareer</div>
              <div className={styles.descriptionText}>
                ทำแบบทดสอบเพียงไม่ถึง 30 นาที ค้นพบเส้นทางอนาคตที่เหมาะกับคุณได้ทันที
              </div>
              <div className={styles.buttonContainer2}>
                <Button type="primary" className={styles.button} onClick={startTest}>
                  <span>เริ่มต้นการทดสอบบุคลิกภาพ</span>
                </Button>
              </div>
            </>
          )}
          {/* Step 0.5: หน้าคั่นก่อนเริ่มทำแบบทดสอบบุคลิกภาพ */}
          {step === 0.5 && (
            <>
              <div className={styles.descriptionText1}>ขั้นตอนแรก</div>
              <div className={styles.text}>ค้นหาตัวตนที่แท้จริงของคุณ</div>
              <div className={styles.descriptionText2}>
                เราจะแสดงสถานการณ์แบบสุ่มเพื่อช่วยให้เราทราบตัวตนของคุณมากขึ้น
              </div>
              <div className={styles.buttonContainer2}>
                <Button type="primary" className={styles.button2} onClick={startTestper}>
                  <span>เริ่มต้นแบบทดสอบบุคลิกภาพ</span>
                </Button>
              </div>
            </>
          )}
          {/* Step 1.5: หน้าอธิบายก่อนเริ่มเทสชุดที่ 2 */}
          {step === 1.5 && (
            <>
              <div className={styles.descriptionText1}>ขั้นตอนถัดไป</div>
              <div className={styles.text}>ค้นหาความชอบที่คุณสนใจ</div>
              <div className={styles.descriptionText}>
                เราจะแสดงสถานการณ์แบบสุ่มเพื่อช่วยให้เราทราบตัวตนของคุณมากขึ้น
              </div>
              <div className={styles.buttonContainer2}>
                <Button type="primary" className={styles.button2} onClick={startInterestTest}>
                  <span>เริ่มต้นแบบทดสอบความสนใจ</span>
                </Button>
              </div>
            </>
          )}

          {/* Step 1 & 2: หน้าคำถาม */}
          {(step === 1 || step === 2) && (
            <div className={styles.questionContainer}>
              <div className={styles.titletext}></div>
              {[0, 1, 2].map((offset) => {
                const questionIndex = currentQuestionIndex + offset;
                const question = step === 1
                  ? personalityQuestions[questionIndex]
                  : interestQuestions[questionIndex];

                if (!question) return null;

                return (
                  <div key={questionIndex} className={styles.questionBlock}>
                    <div className={styles.textquestion}>{question.question}</div>
                    <div className={styles.optionsContainer}>
                      <div className={styles.optionLabelLeft}>ไม่เห็นด้วย</div>
                      {question.options.map((option, index) => {
                        const score = getScoreFromOption(option);
                        const answers = step === 1 ? personalityAnswers : interestAnswers;
                        return (
                          <Button
                          key={index}
                          className={`
                            ${styles.optionButton} 
                            ${index === 0 ? styles.optionButtonLarge : ''}
                            ${index === 1 ? styles.optionButtonMedium : ''}
                            ${index === 2 ? styles.optionButtonSmall : ''}
                            ${index === 3 ? styles.optionButtonMedium : ''}
                            ${index === 4 ? styles.optionButtonLarge : ''}
                          `}
                          style={{
                            border: `4.5px solid ${index < 2 ? "#E4815A" : index === 2 ? "#CCCCCC" : "#0180CC"}`, 
                            ...(Math.abs(answers[questionIndex]) === score
                              ? { backgroundColor: index < 2 ? "#E4815A" : index === 2 ? "#CCCCCC" : "#0180CC" }
                              : {}),
                          }}
                          onClick={() => handleAnswer(option, questionIndex)}
                        ></Button>
                        );
                      })}
                      <div className={styles.optionLabelRight}>เห็นด้วย</div>
                    </div>
                  </div>
                );
              })}
              <div className={styles.buttonContainer}>
                <Button
                  type="primary"
                  className={styles.backButton}
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                >
                  ย้อนกลับ
                </Button>
                <Button
                  type="primary"
                  className={styles.nextButton}
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
                        handleSubmit();
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
{step === 3 && (
  <div className={styles.resultContainer}>
    <h2 className={styles.resultTitle}>อาชีพที่เหมาะกับคุณ</h2>
    <div className={styles.careersGrid}>
      {careers.map(c => (
        <div 
          key={c.careerid} 
          className={`${styles.careerCard} ${selectedCareerId === c.careerid ? styles.selectedCareer : ''}`}
          onClick={() => fetchMajors(c.careerid, c.careername)}
        >
          <div className={styles.careerName}>{c.careername}</div>
          <div className={styles.careerDescription}>{c.description}</div>
        </div>
      ))}
    </div>

    {selectedCareerId && (
      <div className={styles.majorsSection}>
        <h3 className={styles.sectionTitle}>สาขาที่เกี่ยวข้องกับอาชีพ: {selectedCareerName}</h3>
        <div className={styles.majorsGrid}>
          {majors.map(m => (
            <div 
              key={m.majorid} 
              className={`${styles.majorCard} ${majorDetail?.majorid === m.majorid ? styles.selectedMajor : ''}`}
              onClick={() => fetchMajorDetail(m.majorid)}
            >
              <div className={styles.majorIcon}>🎓</div>
              <div className={styles.majorName}>{m.majorname}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {majorDetail && (
      <div className={styles.majorDetailSection}>
        <h4 className={styles.sectionTitle}>📝 รายละเอียดสาขา: {majorDetail.majorname}</h4>
        <p className={styles.detailText}>{majorDetail.description}</p>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>คณะ:</span>
          <span className={styles.detailValue}>{majorDetail.faculty?.facultyname || "ไม่พบข้อมูล"}</span>
        </div>

        <h4 className={styles.sectionTitle}>🏫 มหาวิทยาลัยที่เปิดสอน</h4>
        <div className={styles.universitiesList}>
          {majorDetail.universities.map(u => (
            <div key={u.universityid} className={styles.universityItem}>
              <div className={styles.universityName}>{u.universityname}</div>
              <div className={styles.universityLocation}>{u.location}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}
        </div>
        {/* ด้านขวาของหน้าจอ */}
        <div className={styles.rightBox} style={{ padding: "49px 55px 0px 70px" }}>
        <Steps
              direction="vertical"
              current={step >= 3 ? 4 : step}
              items={[
                {
                  title: <div className={styles.stepTitle}>เริ่มต้นการใช้งาน</div>,
                  description: <div className={styles.stepDescription}>{'< 1 นาที'}</div>,
                },
                {
                  title: <div className={styles.stepTitle}>แบบทดสอบบุคลิกภาพ</div>,
                  description: <div className={styles.stepDescription}>{'< 10 นาที'}</div>,
                },
                {
                  title: <div className={styles.stepTitle}>แบบทดสอบความสนใจ</div>,
                  description: <div className={styles.stepDescription}>{'< 10 นาที'}</div>,
                },
                {
                  title: <div className={styles.stepTitle}>รวมต้นแบบบุคลิกภาพของคุณ</div>,
                  description: <div className={styles.stepDescription}>{'< 1 นาที'}</div>,
                },
                {
                  title: <div className={styles.stepTitle}>ผลลัพธ์ของคุณ</div>,
                  description: (
                    <div>
                      <div className={styles.stepDescription}>{'< 3 นาที'}</div>
                      <div className={styles.stepDescription2}>รายงานบุคลิกภาพ</div>
                    </div>
                  ),
                },
              ]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </main>
  );
};

export default TestPage;
