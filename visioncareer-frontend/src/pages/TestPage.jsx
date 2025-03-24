import React, { useState } from 'react';
import { Button, Steps } from 'antd';
// import '../styles/TestPage.css'; // นำเข้าไฟล์ CSS
import styles from '../styles/TestPage.module.css'; // นำเข้าไฟล์ CSS Modules
import { personalityQuestions, interestQuestions } from '../data/questions';

const { Step } = Steps;


//สร้างข้อมูลคำถาม (ความชอบ 48 ข้อ)
// const interestQuestions = [
//   { question: "คุณชอบทดสอบคุณภาพชิ้นส่วนอุปกรณ์", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
//   { question: "คุณชอบงานก่ออิฐก่อสร้าง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
//   { question: "คุณชอบทำงานบนแท่นขุดเจาะน้ำมันนอกชายฝั่ง", options: ["ไม่ชอบอย่างมาก", "ไม่ชอบ", "เฉยๆ", "ชอบ", "ชอบอย่างมาก"] },
// ];


//คำถามชุดที่ 2 (บุคลิกภาพ) - 33 ข้อ
// const personalityQuestions = [
//   { question: "คุณมีชีวิตชีวาในงานปาร์ตี้", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
//   { question: "คุณไม่ค่อยพูดมาก", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
//   { question: "คุณรู้สึกสบายใจเมื่ออยู่กับผู้คน", options: ["ไม่เห็นด้วยอย่างมาก", "ไม่เห็นด้วย", "เฉยๆ", "เห็นด้วย", "เห็นด้วยอย่างมาก"] },
// ];



const TestPage = () => {
  const [step, setStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [interestAnswers, setInterestAnswers] = useState({});

  // ฟังก์ชันต่าง ๆ ที่ใช้ใน component
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

  const handleAnswer = (answer, questionIndex) => {
    let score = getScoreFromOption(answer);
    if (step === 1 && negativeScoreQuestions.includes(questionIndex)) {
      score = -score;
    }
    if (step === 1) {
      setPersonalityAnswers((prev) => ({ ...prev, [questionIndex]: score }));
    } else if (step === 2) {
      setInterestAnswers((prev) => ({ ...prev, [questionIndex]: score }));
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
                <h2 className={styles.resultTitle}>การจับคู่ของคุณ: คุณเป็นคนประเภท......</h2>
                <div className={styles.resultSection}>
                  <div className={styles.resultDescription}>
                    {/* {ไว้ใส่ข้อมูล เมื่อ model ให้ผลลัพท์ออกมา} */}
                  </div>
                </div>

                <h2 className={styles.resultTitle}>ความสนใจของคุณ: .......</h2>
                <div className={styles.resultSection}>
                  <div className={styles.resultDescription}>
                    {/* {ไว้ใส่ข้อมูล เมื่อ model ให้ผลลัพท์ออกมา} */}
                  </div>
                </div>

                <h2 className={styles.resultTitle}>คุณเหมาะกับอาชีพและคณะ วิศวกรรมคอมพิวเตอร์</h2>
                <div className={styles.resultSection}>
                  <div className={styles.resultDescription}>
                    {/* {ไว้ใส่ข้อมูล เมื่อ model ให้ผลลัพท์ออกมา} */}
                    วิศวกรรมคอมพิวเตอร์ผสมผสานหลักการของวิศวกรรมไฟฟ้าและวิทยาการ
                    คอมพิวเตอร์ พัฒนา และเพิ่มประสิทธิภาพของระบบคอมพิวเตอร์ ฮาร์ดแวร์ และซอฟต์แวร์ ซึ่งเป็นกระดูกสันหลังของเทคโนโลยีสมัยใหม่ ขับเคลื่อนนวัตกรรมในด้านปัญญาประดิษฐ์ (AI), อินเทอร์เน็ตของสรรพสิ่ง (IoT), หุ่นยนต์ และอื่นๆ
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* ด้านขวาของหน้าจอ */}
        <div className={styles.rightBox} style={{ padding: "52px 55px 0px 70px" }}>
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