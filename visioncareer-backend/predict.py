import os
import pandas as pd
import numpy as np
import xgboost as xgb
import requests  
from flask import Flask, request, jsonify

app = Flask(__name__)
BACKEND_URL = "http://localhost:5000"

# 📌 กำหนด path ให้แน่นอน
ML_DIR = os.path.join(os.path.dirname(__file__), "../ML")

# โหลดโมเดล
models = {
    "holland": xgb.Booster(),
    "big5": xgb.Booster()
}

try:
    models["holland"].load_model(os.path.join(ML_DIR, "xgb_model_holland.json"))
    models["big5"].load_model(os.path.join(ML_DIR, "xgb_model_big5.json"))
    print("✅ โมเดลโหลดสำเร็จ!")
except Exception as e:
    print(f"❌ เกิดข้อผิดพลาดในการโหลดโมเดล: {e}")

# ฟีเจอร์เซ็ตของแต่ละโมเดล
holland_features = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8',
                    'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8',
                    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                    'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
                    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
                    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']

big5_features = ['EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5', 'EXT7', 'EXT8',
                 'EST1', 'EST2', 'EST3', 'EST4', 'EST6', 'EST7',
                 'AGR1', 'AGR2', 'AGR3', 'AGR4', 'AGR6', 'AGR8', 'AGR10',
                 'CSN1', 'CSN2', 'CSN4', 'CSN6', 'CSN7', 'CSN8', 'CSN9', 'CSN10',
                 'OPN1', 'OPN2', 'OPN3', 'OPN7', 'OPN10']

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "🚀 Flask API พร้อมใช้งาน!", "routes": ["/predict"]})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json.get("answers", [])
        user_id = request.json.get("user_id")  # ✅ รับ user_id จาก frontend

        # ✅ ตรวจสอบว่าอินพุตมี 81 ค่า
        expected_features = len(holland_features) + len(big5_features)
        if len(data) != expected_features:
            return jsonify({
                "error": f"Feature shape mismatch, expected: {expected_features}, got {len(data)}"
            }), 400

        # ✅ แยกอินพุตให้แต่ละโมเดล
        holland_data = data[:len(holland_features)]  # 48 ค่า
        big5_data = data[len(holland_features):]  # 33 ค่า

        # ✅ แปลงเป็น DataFrame
        holland_df = pd.DataFrame([holland_data], columns=holland_features)
        big5_df = pd.DataFrame([big5_data], columns=big5_features)

        # ✅ พยากรณ์ผลลัพธ์ (ใช้ argmax() แปลงค่า Probability → กลุ่ม)
        holland_pred = int(np.argmax(models["holland"].predict(xgb.DMatrix(holland_df))))
        big5_pred = int(np.argmax(models["big5"].predict(xgb.DMatrix(big5_df))))

        print(f"📌 กลุ่ม Holland: {holland_pred}, กลุ่ม Big5: {big5_pred}")

        predictions = {
            "holland_group": holland_pred + 1,  # ให้เริ่มจาก 1 แทน 0
            "big5_group": big5_pred + 1  # ให้เริ่มจาก 1 แทน 0
        }

        # ✅ ส่งผลลัพธ์ไปบันทึกใน Backend
        try:
            response = requests.post(f"{BACKEND_URL}/results", json={
                "user_id": user_id,
                "holland_group": predictions["holland_group"],
                "big5_group": predictions["big5_group"]
            })

            if response.status_code != 200:
                print("❌ Failed to save prediction result:", response.json())
        except Exception as err:
            print("❌ ไม่สามารถบันทึกผลลัพธ์ไปที่ Backend:", err)

        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 กำลังรัน Flask API บนพอร์ต 5001...")
    app.run(debug=True, port=5001)