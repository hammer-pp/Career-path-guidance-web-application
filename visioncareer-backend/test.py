import xgboost as xgb

# โหลดโมเดล Holland
holland_model = xgb.Booster()
holland_model.load_model("../ML/xgb_model_holland.json")

# โหลดโมเดล Big5
big5_model = xgb.Booster()
big5_model.load_model("../ML/xgb_model_big5.json")

# ตรวจสอบฟีเจอร์
print("📌 Holland Features:", holland_model.feature_names)
print("📌 Big5 Features:", big5_model.feature_names)
print(f"Holland features: {len(holland_model.feature_names)}")  # ควรเป็น 48
print(f"Big5 features: {len(big5_model.feature_names)}")  # ควรเป็น 33
