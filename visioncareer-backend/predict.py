import os
import pandas as pd
import numpy as np
import xgboost as xgb
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from dotenv import load_dotenv
import math
from sklearn.preprocessing import StandardScaler
load_dotenv()
app = Flask(__name__)
CORS(app)
BACKEND_URL = os.getenv('VITE_API_URL')
ML_DIR = os.path.join(os.path.dirname(__file__), "../ML","artifacts")

try:
    models = {
        "holland": joblib.load(os.path.join(ML_DIR, "xgb_model_holland.pkl")),
        "big5": joblib.load(os.path.join(ML_DIR, "xgb_model_bigfive.pkl"))
    }
    print("✅ โมเดลโหลดสำเร็จ!")
except Exception as e:
    print(f"❌ เกิดข้อผิดพลาดในการโหลดโมเดล: {e}")

try:
    scalers = {
    "holland": joblib.load(os.path.join(ML_DIR, "holland_scaler.pkl")),
    "big5": joblib.load(os.path.join(ML_DIR, "bigfive_scaler.pkl"))
}
    print("✅ scalerโหลดสำเร็จ!")
except Exception as e:
    print(f"❌ เกิดข้อผิดพลาดในการโหลดscaler: {e}")



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
        # Get the request data
        data = request.get_json()
        # print("📥 Raw data from frontend:", data)
        answers = data.get("answers", [])
        user_id = data.get("user_id", None)

        # Validate the input data
        if len(answers) != 81:
            return jsonify({'error': f'Feature shape mismatch: expected 81, got {len(answers)}'}), 400

        answers_array = np.array(answers)

        # ✅ แก้ slice ให้ถูกต้อง
        big5_data= answers_array[:33]
        holland_data = answers_array[33:]

        # print("✅ Big5 (33):", big5_data.tolist())
        # print("✅ Holland (48):", holland_data.tolist())
        
       # Create DataFrames for the features
        holland_df = pd.DataFrame([holland_data], columns=holland_features)
        big5_df = pd.DataFrame([big5_data], columns=big5_features)

        # ✅ Apply scalers
        holland_scaled = scalers["holland"].transform(holland_df)
        big5_scaled = scalers["big5"].transform(big5_df)

        
        # Convert Scaler data to DataFrame 
        holland_scaled = pd.DataFrame(holland_scaled, columns=holland_features)
        big5_scaled = pd.DataFrame(big5_scaled, columns=big5_features)

        traits = {
        'Realistic': ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'],
        'Investigative': ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8'],
        'Artistic': ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
        'Social': ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        'Enterprising': ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
        'Conventional' : ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']}
        
        
        mean_scores = {
            trait: round(holland_scaled[cols].mean(axis=1).iloc[0], 4)
            for trait, cols in traits.items()
        }
        mean_scores = pd.DataFrame(mean_scores, index=[0]).T
        #print("📊 Holland Mean Scores DataFrame:", mean_scores)

        scaler = StandardScaler()
        scaled = scaler.fit_transform(mean_scores)

        # ใส่กลับเป็น DataFrame
        holland_score = pd.DataFrame(scaled, index=mean_scores.index, columns=['Standardized Score'])

        # คำนวณ Softmax
        exps = np.exp(holland_score['Standardized Score'])
        holland_score['Percentage'] = (exps / exps.sum()) * 100

        # จัดรูปแบบ
        holland_score['Percentage'] = holland_score['Percentage'].round(2)
        holland_score= holland_score.drop(columns=['Standardized Score'])

        print("📊 Holland Percentages:", holland_score)
        

        


        traits = {
        'Extroversion': ['EXT1', 'EXT2', 'EXT3', 'EXT4', 'EXT5',  'EXT7', 'EXT8'],
        'Agreeableness': ['AGR1', 'AGR2', 'AGR3', 'AGR4',  'AGR6',  'AGR8',  'AGR10'],
        'Conscientiousness': ['CSN1', 'CSN2',  'CSN4',  'CSN6', 'CSN7', 'CSN8', 'CSN9', 'CSN10'],
        'Neuroticism': ['EST1', 'EST2', 'EST3', 'EST4',  'EST6', 'EST7'],
        'Openness': ['OPN1', 'OPN2', 'OPN3',  'OPN7',  'OPN10']
        }

        mean_scores = {
            trait: round(big5_scaled[cols].mean(axis=1).iloc[0], 4)
            for trait, cols in traits.items()
        }
        mean_scores = pd.DataFrame(mean_scores, index=[0]).T
        #print("📊 BigFive Mean Scores DataFrame:", mean_scores)

        scaler = StandardScaler()
        scaled = scaler.fit_transform(mean_scores)

        # ใส่กลับเป็น DataFrame
        big5_score = pd.DataFrame(scaled, index=mean_scores.index, columns=['Standardized Score'])

        # คำนวณ Softmax
        exps = np.exp(big5_score['Standardized Score'])
        big5_score['Percentage'] = (exps / exps.sum()) * 100

        # จัดรูปแบบ
        big5_score['Percentage'] = big5_score['Percentage'].round(2)
        big5_score= big5_score.drop(columns=['Standardized Score'])
        
        print("📊 BigFive Percentages:", big5_score)
       

        # XGBoost prediction 
        holland_pred = models["holland"].predict(holland_scaled)
        big5_pred = models["big5"].predict(big5_scaled)

        # Convert predictions to integers
        holland_pred = int(holland_pred[0])
        big5_pred = int(big5_pred[0])

        print(f"📌 กลุ่ม Holland: {holland_pred}, กลุ่ม Big5: {big5_pred}")

        predictions = {
            "holland_group": holland_pred,
            "big5_group": big5_pred,
            "holland_scores": holland_score.T.to_dict(orient="records"),
            "big5_scores": big5_score.T.to_dict(orient="records")
        }
        return jsonify(predictions)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    print("🚀 กำลังรัน Flask API บนพอร์ต 5001...")
    app.run(host="0.0.0.0", port=5001, debug=True)

