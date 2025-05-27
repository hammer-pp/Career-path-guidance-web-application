
# Developer Manual: VisionCareer Web Application

## 🎓 Senior Project Group CPE36
- Siraphop Ardhan   64070501053  
- Surachai Aungcharoen  64070501054  
- Thanapat Sittiyodying 64070501067  

---

## 📁 Project Structure

```
Career-path-guidance-web-application/
├── visioncareer-frontend/       # React + Vite
│   └── package.json
├── visioncareer-backend/        # Express.js + ML model (predict.py)
│   ├── server.js
│   ├── predict.py
│   └── package.json
├── requirements.txt             # Combined Python + Node.js dependencies
└── README.md
```

---

## ✅ Prerequisites

- Node.js ≥ 18.x: https://nodejs.org/
- npm (comes with Node.js)
- Python ≥ 3.9
- PostgreSQL (for backend)

---

## ⚙️ Environment Variables (`.env`)

```env
# For backend
DATABASE_URL=postgres://username:password@localhost:5432/your_db_name

# For frontend
VITE_API_URL=http://localhost:5000
VITE_FLASK_URL=http://localhost:5001
VITE_FRONTEND_URL=http://localhost:5173
```

---

## 🌐 Frontend Setup (`visioncareer-frontend`)

```bash
cd visioncareer-frontend
npm install
```

### Development Server

```bash
npm run dev
```
> The system will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
npx serve -s build
```

---

## 🔧 Backend Setup (`visioncareer-backend`)

```bash
cd visioncareer-backend
npm install
```

### Start the API Server

```bash
node server.js
```
> Backend API will run at `http://localhost:5000`

---

## 🤖 ML Model Setup (`predict.py`)

### Install Python packages:
```bash
pip install -r ../requirements.txt
```

### Start prediction server:
```bash
cd visioncareer-backend
python predict.py
```

> Flask ML server will run at `http://localhost:5001`

---

## 🧪 Testing

- Test the backend using Postman or curl
- Test the frontend using the browser (DevTools F12)
- Test the ML server using HTTP clients like curl / axios

---

## 📦 Combined Dependencies

See [`requirements.txt`](./requirements.txt) for a complete list of dependencies including both Node.js and Python.

---

## 📝 License

This project is intended for academic use only (KMUTT CPE Senior Project).
