import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Upload, Avatar, Divider, Menu, Card, Row, Col, DatePicker, Select, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  BarChartOutlined,
  LogoutOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import moment from 'moment-timezone';// อย่าลืม npm install moment-timezone
import AuthContext from "./AuthContext";
import axios from "axios";
import styles from '../styles/ProfilePage.module.css';
import HistoryPage from "./HistoryPage";
import { useLocation } from "react-router-dom";

const { Item } = Form;
const { Option } = Select;
const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  // const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // ตั้งค่า activeTab จาก state ที่ส่งมากับ navigation
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');

    // เพิ่ม useEffect เพื่อติดตามการเปลี่ยนแปลงของ location.state
    useEffect(() => {
      if (location.state?.activeTab) {
        setActiveTab(location.state.activeTab);
      }
    }, [location.state]);
    
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/users/${user.userid}`);
        
        // แปลงวันที่จาก API ให้เป็น Moment object
        const dateOfBirth = res.data.dateofbirth 
          ? moment(res.data.dateofbirth).tz('Asia/Bangkok') // แปลงเป็น Timezone ไทย
          : null;

        form.setFieldsValue({
          fullname: res.data.fullname,
          email: res.data.email,
          phonenumber: res.data.phonenumber,
          dateOfBirth: dateOfBirth,
          gender: res.data.gender,
          createdDate: res.data.createdat 
            ? new Date(res.data.createdat).toLocaleString() 
            : 'ไม่ทราบวันที่'
        });
      } catch (err) {
        console.error("❌ ไม่สามารถโหลดข้อมูลผู้ใช้:", err);
        message.error("ไม่สามารถโหลดข้อมูลผู้ใช้");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, form]);

  const handleSave = async (values) => {
    if (values.password && values.password !== values.confirmPassword) {
      message.error("❗️ รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      setLoading(true);
      
      // เตรียมข้อมูลที่จะส่งไปยัง API
      const payload = {
        fullname: values.fullname,
        email: values.email,
        phonenumber: values.phonenumber,
        gender: values.gender,
        // แปลง Moment object เป็นรูปแบบวันที่ที่ API ต้องการ (YYYY-MM-DD)
        dateofbirth: values.dateOfBirth 
          ? values.dateOfBirth.format('YYYY-MM-DD') 
          : null,
      };

      // เพิ่ม password ถ้ามีการเปลี่ยน
      if (values.password) {
        payload.password = values.password;
      }

      console.log('Sending data:', payload); // Debug log

      await axios.put(`${API_URL}/users/${user.userid}`, payload);
      message.success("✅ บันทึกข้อมูลเรียบร้อยแล้ว");
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      message.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";  // ✅ ใช้ window.location แทน useNavigate()
  };
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span={18}>
          <Card className={styles.contentCard}>
            <div className={styles.pageHeader}>
              <Menu
                mode="horizontal"
                selectedKeys={[activeTab]}
                onClick={({ key }) => handleTabChange(key)}
                className={styles.horizontalMenu}
              >
                <Menu.Item key="profile" icon={<UserOutlined style={{ fontSize: '20px' ,marginLeft:'-12px'}}/>}>
                  โปรไฟล์
                </Menu.Item>
                <Menu.Item key="testResults" icon={<BarChartOutlined style={{ fontSize: '20px' }}/>}>
                  ผลการทดสอบ
                </Menu.Item>
                <Menu.Item key="security" icon={<SafetyOutlined style={{ fontSize: '20px' }} />}>
                  ความปลอดภัย
                </Menu.Item>
              </Menu>
            </div>

            {activeTab === 'profile' && (
              <div className={styles.profileSection}>
              <Form form={form} onFinish={handleSave} layout="vertical">
              <Row gutter={24}>
                <Col span={16}>
                  <Item label={<span style={{ fontSize: '16px' }}>ชื่อ-นามสกุล</span>} name="fullname">
                    <Input className={styles.inputStylename} />
                  </Item>
                  
                  {/* เพิ่มช่องเบอร์โทรศัพท์ตรงนี้ */}
                  <Item label={<span style={{ fontSize: '16px' }}>เบอร์โทรศัพท์</span>} name="phonenumber">
                    <Input className={styles.inputStylephone} prefix={<PhoneOutlined />} />
                  </Item>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Item label={<span style={{ fontSize: '16px' }}>เพศ</span>} name="gender">
                        <Select className={styles.inputStylename2} placeholder="เลือกเพศ">
                          <Option value="male">ชาย</Option>
                          <Option value="female">หญิง</Option>
                          <Option value="other">อื่นๆ</Option>
                        </Select>
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item label={<span style={{ fontSize: '16px' }}>วันเกิด</span>} name="dateOfBirth">
                        <DatePicker className={styles.inputStylename3} />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>

                <Divider />

                <Row gutter={16}>
                  <Col span={12}>
                    <Item label={<span style={{ fontSize: '16px' }}>อีเมล</span>} name="email" rules={[{ type: 'email' }]}>
                      <Input className={styles.inputStyle} prefix={<MailOutlined />} disabled/>
                    </Item>
                  </Col>
                  {/* ย้ายช่องวันที่สร้างบัญชีมาคู่กับอีเมล */}
                  <Col span={12}>
                    <Item label={<span style={{ fontSize: '16px' }}>วันที่สร้างบัญชี</span>} name="createdDate">
                      <Input className={styles.inputStyle} disabled />
                    </Item>
                  </Col>
                </Row>

                <div className={styles.submitbutton}>
                  <Button className={styles.buttonStyle} type="primary" htmlType="submit" block>
                    บันทึก
                  </Button>
                </div>
              </Form>
              </div>
            )}

        {/* // ในส่วน return ของ ProfilePage.jsx ให้แก้ไขส่วนของแท็บ testResults */}
            {activeTab === 'testResults' && (
              <div className={styles.testResultsSection}>
                <HistoryPage />
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.securitySection}>
                <Form onFinish={handleSave} layout="vertical">
                  <Item 
                    name="currentPassword" 
                    label={<span style={{ fontSize: '16px' }}>รหัสผ่านปัจจุบัน</span>}
                    
                  >
                    <Input.Password prefix={<LockOutlined />} className={styles.inputStyle}  />
                  </Item>

                  <Item 
                    name="password"                    
                    label={<span style={{ fontSize: '16px' }}>รหัสผ่านใหม่</span>}
                  >
                    <Input.Password prefix={<LockOutlined />} className={styles.inputStyle}/>
                  </Item>

                  <Item 
                    name="confirmPassword"                   
                    label={<span style={{ fontSize: '16px' }}>ยืนยันรหัสผ่านใหม่</span>}
                    dependencies={['password']}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} className={styles.inputStyle}/>
                  </Item>

                  <Item>
                    <Button className={styles.buttonStyle2} type="primary" htmlType="submit">
                      เปลี่ยนรหัสผ่าน
                    </Button>
                  </Item>
                </Form>
              </div>
            )}
          </Card>
        </Col>

        <Col span={6}>
          <Card className={styles.sidebar}>
            <Menu
              mode="vertical"
              selectedKeys={[activeTab]}
              onClick={({ key }) => {
                if (key === 'logout') {
                  // เรียกฟังก์ชัน logout จาก AuthContext
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  window.location.href = "/";
                  logout();
                } else {
                  handleTabChange(key);
                }
              }}
              className={styles.menu}
            >
              <Menu.Item key="profile" icon={<UserOutlined style={{ fontSize: '20px' }} />}>
                โปรไฟล์
              </Menu.Item>
              <Menu.Item key="testResults" icon={<BarChartOutlined style={{ fontSize: '20px' }}/>}>
                ผลการทดสอบ
              </Menu.Item>
              <Menu.Item key="security" icon={<SafetyOutlined style={{ fontSize: '20px' }}/>}>
                ความปลอดภัย
              </Menu.Item>
              {/* <Divider /> */}
               <Menu.Item key="logout" icon={<LogoutOutlined  style={{ fontSize: '20px' }}/>} danger>
                ออกจากระบบ
              </Menu.Item>
            </Menu>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;