# Margin Trading Management System - JARVIS Admin Dashboard

## Overview
Complete admin dashboard for margin trading management with AI-powered JARVIS copilot. Designed for professional traders and risk managers.

---

## Key Features

### Dashboard Home
- 📊 Real-time statistics (Total Margin Debt, Warnings, Force Sells, Daily Profit)
- 📈 7-day Margin Trend Chart
- 🎯 Account Distribution Chart  
- 🏆 Top 5 High-Debt Accounts Table

### Full CRUD Management
All tabs support complete Create, Read, Update, Delete operations:

**💼 Tài khoản (Accounts)**
- Search & filter accounts
- Add new margin accounts
- Edit account details (Capital, Margin limits)
- Delete accounts
- View account status (Active/Warning/Force Sell)

**📈 Danh mục Vị thế (Positions)**
- Track open positions
- Auto-calculate Profit/Loss (Green for profit, Red for loss)
- Monitor margin utilization
- Real-time position updates

**📱 Chứng khoán (Securities)**
- Manage tradeable securities
- Set daily price limits (Giá trần/Giá sàn)
- Track lending ratios
- Update prices

**📝 Sổ lệnh (Orders)**
- Create Buy/Sell orders
- Track order status (Pending/Filled/Cancelled)
- View order history
- Modify pending orders

### AI Copilot (JARVIS)
Intelligent assistant providing:
- ⚠️ Real-time alerts (Margin < threshold)
- 💡 Auto-suggestions for risk optimization
- 🤖 Predictions based on trading patterns
- 📊 Market analysis & insights
- 💬 Natural language chat interface

### Settings & Configuration
- 🔑 API Key management (OpenAI/Claude for AI features)
- 📊 Custom Margin Ratio thresholds (Initial & Maintenance)
- 🔔 Notification preferences
- 💾 Persistent settings (localStorage)

---

## Technical Stack

### Frontend
- Pure HTML5 + CSS3 + Vanilla JavaScript
- Responsive design (Desktop/Tablet/Mobile)
- Real-time updates via WebSocket-ready
- LocalStorage for client-side settings

### Backend
- Flask (Python)
- CORS enabled for cross-origin requests
- SQL Server integration (pyodbc)
- RESTful API with full CRUD operations

### Database
- Microsoft SQL Server
- 4 main tables: TKKYQUY, CHUNGKHOAN, VITHE, LENHGD
- Support for role-based access control (ready for extension)

---

## Installation

### Prerequisites
- Python 3.7+
- SQL Server 2016+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

1. **Clone/Download Files**
```bash
# Your project structure should be:
.
├── index.html           # Main UI
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── SETUP.md           # Setup guide
└── README.md          # This file
```

2. **Install Dependencies**
```bash
pip install -r requirements.txt
```

Or manually:
```bash
pip install flask==2.3.3 flask-cors==4.0.0 pyodbc==4.0.39
```

3. **Configure Database Connection**
Edit `app.py` line 11:
```python
DB_CONNECTION_STRING = 'Driver={ODBC Driver 17 for SQL Server};Server=YOUR_SERVER;Database=YOUR_DB;Trusted_Connection=yes;'
```

4. **Start Flask Backend** (Terminal 1)
```bash
python app.py
```
Server runs on: http://localhost:5000

5. **Serve Frontend** (Terminal 2)
```bash
python -m http.server 8000
```
Frontend runs on: http://localhost:8000

6. **Open Dashboard**
Visit: http://localhost:8000

---

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

**Tài khoản (Accounts)**
- `GET /taikhoan` - List all accounts
- `GET /taikhoan/<matk>` - Get account details
- `POST /taikhoan` - Create account
- `PUT /taikhoan/<matk>` - Update account
- `DELETE /taikhoan/<matk>` - Delete account

**Chứng khoán (Securities)**
- `GET /chungkhoan` - List all securities
- `GET /chungkhoan/<mack>` - Get security details
- `POST /chungkhoan` - Create security
- `PUT /chungkhoan/<mack>` - Update security
- `DELETE /chungkhoan/<mack>` - Delete security

**Vị thế (Positions)**
- `GET /vithe` - List all positions
- `GET /vithe/<id>` - Get position details
- `POST /vithe` - Create position
- `PUT /vithe/<id>` - Update position
- `DELETE /vithe/<id>` - Delete position

**Sổ lệnh (Orders)**
- `GET /lenhgd` - List all orders
- `GET /lenhgd/<malenhgd>` - Get order details
- `POST /lenhgd` - Create order
- `PUT /lenhgd/<malenhgd>` - Update order
- `DELETE /lenhgd/<malenhgd>` - Delete order

---

## Usage Guide

### Daily Workflow

1. **Morning Check**
   - Open Dashboard
   - Review overnight stats & JARVIS alerts
   - Check Top 5 high-debt accounts

2. **Account Management**
   - Go to "Tài khoản" tab
   - Add new clients: Click "+ Thêm" button
   - Edit limits: Click pencil icon
   - Monitor warning accounts

3. **Create Trading Orders**
   - Go to "Sổ lệnh" tab
   - Click "+ Thêm" to create order
   - Fill: Mã TK, Mã CK, Loại (Buy/Sell), Quantity, Price
   - System auto-calculates margin requirement

4. **Monitor Positions**
   - Go to "Danh mục Vị thế"
   - View current P&L (Green = Profit, Red = Loss)
   - Get JARVIS suggestions for exit points

5. **Risk Analysis**
   - Go to "Phân tích & Báo cáo"
   - View "Danh mục rủi ro" table
   - Check margin ratio vs thresholds

6. **Configure AI**
   - Go to "Cài đặt"
   - Enter OpenAI/Claude API key
   - Set custom thresholds
   - JARVIS will activate with AI predictions

---

## Configuration

### API Key Setup
1. Get API key from OpenAI (https://openai.com/api/) or Claude (https://console.anthropic.com/)
2. Go to Settings tab → AI Copilot API Key
3. Paste your key
4. Click "Hiển thị" to verify
5. JARVIS will use this key for AI predictions

### Margin Thresholds
- **Margin Ratio Khởi tạo (%)**: Initial margin requirement (default: 50%)
- **Margin Ratio Duy trì (%)**: Maintenance margin (default: 35%)
- JARVIS alerts when margin falls below these thresholds

### Notifications
Enable/disable alerts for:
- Margin violations
- Force sell warnings
- Daily profit/loss reports

---

## Color Scheme

### Professional Blue Theme
- **Primary**: Deep Blue (#0052A3)
- **Secondary**: Light Blue (#6C9FE6)
- **Accent**: Coral Red (#FF6B6B) for alerts
- **Success**: Green (#00C853) for profits
- **Danger**: Red (#FF5252) for losses

### UI Elements
- Status badges: Active (Green), Warning (Orange), Force Sell (Red)
- Profit/Loss: Green text (profit), Red text (loss)
- Charts: Blue gradient backgrounds
- Sidebar: Dark blue with hover effects

---

## Troubleshooting

### "Failed to fetch" in JARVIS
- Check if Flask backend is running on port 5000
- Check browser console (F12) for CORS errors

### Database connection error
- Verify SQL Server is running
- Check connection string in app.py
- Ensure database exists and has proper tables
- Test connection in SQL Server Management Studio

### API key not saving
- Check Settings tab for validation errors
- Verify key format (should start with "sk-" for OpenAI)
- Browser localStorage must be enabled

### Charts not displaying
- Charts are placeholder elements ready for Chart.js integration
- Add Chart.js library: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`
- Uncomment chart initialization in index.html

---

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Chart.js integration for analytics
- [ ] Email/SMS notifications
- [ ] Export to Excel/PDF
- [ ] Multi-user authentication
- [ ] Audit logs & compliance reports
- [ ] Mobile app version
- [ ] Advanced AI forecasting

---

## Support

For issues or questions, check:
1. SETUP.md - Installation guide
2. Browser console (F12) - Error messages
3. Flask logs - Backend errors
4. SQL Server logs - Database issues

---

## License
Internal use only - Margin Trading Management System v2.0
