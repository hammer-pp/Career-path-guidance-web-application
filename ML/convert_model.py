import os
import pickle
import xgboost as xgb

# ตรวจสอบโฟลเดอร์ที่ไฟล์ `.pkl` อยู่จริง
current_dir = os.path.dirname(os.path.abspath(__file__))  # โฟลเดอร์ที่รันสคริปต์
pkl_dir = current_dir  # ใช้โฟลเดอร์ปัจจุบัน

# ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
holland_path = os.path.join(pkl_dir, "xgb_model_holland.pkl")
big5_path = os.path.join(pkl_dir, "xgb_model_big5.pkl")

if not os.path.exists(holland_path) or not os.path.exists(big5_path):
    raise FileNotFoundError("❌ ไม่พบไฟล์ .pkl กรุณาตรวจสอบโฟลเดอร์!")

# โหลดโมเดลจาก `.pkl`
with open(holland_path, "rb") as f:
    holland_model = pickle.load(f)

with open(big5_path, "rb") as f:
    big5_model = pickle.load(f)

# บันทึกใหม่เป็น `.json`
holland_model.save_model(os.path.join(pkl_dir, "xgb_model_holland.json"))
big5_model.save_model(os.path.join(pkl_dir, "xgb_model_big5.json"))

print("✅ โมเดลถูกบันทึกใหม่เป็น .json สำเร็จ!")
