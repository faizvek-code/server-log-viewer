# 📜 Server Log Viewer

A minimal server log viewer with filters using Node.js (Express + node-json-db) for backend and React.js for frontend.

## 🚀 Setup

### 1️⃣ Clone Repo

```bash
git clone https://github.com/yourusername/server-log-viewer.git
cd server-log-viewer
```

### 2️⃣ Backend

```bash
cd backend
npm install
nodemon server.js --ignore myDataBase.json
```

Runs on **[http://localhost:3001](http://localhost:3001)**

### 3️⃣ Frontend

```bash
cd ../frontend
npm install
npm start
```

Runs on **[http://localhost:3000](http://localhost:3000)**

## 🔗 API Example

```
GET /logs?level=error&searchValue=database
```

That’s it — you’re ready to view and filter logs!