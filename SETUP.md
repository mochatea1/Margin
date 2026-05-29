# Setup JARVIS Admin Dashboard

## Quick Start

### 1. Install Dependencies
```bash
pip install flask flask-cors pyodbc
```

### 2. Configure Database
Edit `app.py` line 11 and update your SQL Server connection string:
```python
DB_CONNECTION_STRING = 'Driver={ODBC Driver 17 for SQL Server};Server=YOUR_SERVER;Database=YOUR_DB;Trusted_Connection=yes;'
```

### 3. Start Backend (Terminal 1)
```bash
python app.py
```
Backend runs on: http://localhost:5000

### 4. Serve Frontend (Terminal 2)
```bash
python -m http.server 8000
```
Frontend runs on: http://localhost:8000

### 5. Open Dashboard
Go to: http://localhost:8000

---

## Features

- **Dashboard** - Real-time stats & charts
- **Full CRUD** - Manage all 4 tables (Tài khoản, Vị thế, Chứng khoán, Lệnh)
- **AI Copilot (JARVIS)** - Auto-suggestions, warnings, predictions
- **Admin Panel** - API key settings, thresholds
- **Responsive** - Works on desktop & mobile

---

## File Structure
```
.
├── index.html           # Main UI
├── app.py              # Flask backend (all CRUD endpoints)
├── SETUP.md            # This file
└── SETUP_GUIDE.md      # Detailed guide
```

---

## Database Schema (Required)

Your SQL Server must have these 4 tables:

### TKKYQUY (Margin Accounts)
- MATK (PK)
- TENTK
- TONGTIENHT
- HANMUCVAY
- TIENVAY
- TLKQHIENTAI
- TRANGTHAI

### CHUNGKHOAN (Securities)
- MACK (PK)
- TENCK
- GIAHIENTAI
- GIATHAP
- GIATRẦN
- TLCHOVAY

### VITHE (Positions)
- ID (PK)
- MATK (FK)
- MACK (FK)
- SOLUONG
- GIAVON
- GIAHIENTAI

### LENHGD (Orders)
- MALENHGD (PK)
- MATK (FK)
- MACK (FK)
- LOAI
- SOLUONG
- GIALENH
- NGAYTAO
- TRANGTHAI

---

## API Endpoints

### Tài khoản
- GET `/api/taikhoan`
- POST `/api/taikhoan`
- PUT `/api/taikhoan/<matk>`
- DELETE `/api/taikhoan/<matk>`

### Chứng khoán
- GET `/api/chungkhoan`
- POST `/api/chungkhoan`
- PUT `/api/chungkhoan/<mack>`
- DELETE `/api/chungkhoan/<mack>`

### Vị thế
- GET `/api/vithe`
- POST `/api/vithe`
- PUT `/api/vithe/<id>`
- DELETE `/api/vithe/<id>`

### Sổ lệnh
- GET `/api/lenhgd`
- POST `/api/lenhgd`
- PUT `/api/lenhgd/<malenhgd>`
- DELETE `/api/lenhgd/<malenhgd>`

---

## Troubleshooting

**Error: Cannot import name 'pyodbc'**
```bash
pip install pyodbc
```

**Error: CORS issue**
- Make sure Flask backend is running on port 5000
- Frontend should access from http://localhost:8000

**Error: Database connection failed**
- Check connection string in app.py
- Verify SQL Server is running
- Test connection in SQL Server Management Studio

---

## Next Steps

1. Configure your SQL Server connection
2. Start both servers
3. Open http://localhost:8000
4. Test CRUD operations
5. Set API key in Settings tab for AI features
