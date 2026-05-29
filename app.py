from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
from datetime import datetime
from decimal import Decimal

app = Flask(__name__)
CORS(app)

# ===== DATABASE CONNECTION =====
DB_CONNECTION_STRING = r'Driver={ODBC Driver 17 for SQL Server};SERVER=.\SQLEXPRESS;Database=QuanLyGiaoDichKyQuy;Trusted_Connection=yes;Timeout=30;'

def get_db_connection():
    # Xóa row_factory sai của v0, chỉ giữ lại kết nối chuẩn
    return pyodbc.connect(DB_CONNECTION_STRING)

# ===== HELPER FUNCTIONS (XỬ LÝ DỮ LIỆU SQL SERVER -> JSON) =====
def rows_to_dict_list(cursor):
    columns = [column[0] for column in cursor.description]
    results = []
    for row in cursor.fetchall():
        row_dict = {}
        for i, col in enumerate(columns):
            val = row[i]
            # Convert Decimal của SQL Server sang Float để JSON đọc được
            if isinstance(val, Decimal):
                val = float(val)
            row_dict[col] = val
        results.append(row_dict)
    return results

def row_to_dict(cursor, row):
    if not row: return None
    columns = [column[0] for column in cursor.description]
    row_dict = {}
    for i, col in enumerate(columns):
        val = row[i]
        if isinstance(val, Decimal):
            val = float(val)
        row_dict[col] = val
    return row_dict

# ===== API ENDPOINTS - TAI KHOAN =====
@app.route('/api/taikhoan', methods=['GET'])
def get_taikhoan():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM TKKYQUY ORDER BY MATK')
        taikhoan = rows_to_dict_list(cursor)
        conn.close()
        return jsonify(taikhoan), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/taikhoan/<matk>', methods=['GET'])
def get_taikhoan_detail(matk):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM TKKYQUY WHERE MATK = ?', (matk,))
        tk = row_to_dict(cursor, cursor.fetchone())
        conn.close()
        if tk:
            return jsonify(tk), 200
        return jsonify({'error': 'Not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/taikhoan', methods=['POST'])
def create_taikhoan():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO TKKYQUY (MATK, TENTK, TONGTIENHT, HANMUCVAY, TIENVAY, 
                                 TLKQHIENTAI, TLKQBANDAU, TLKQDUYTRI, TLFORCESELL, TRANGTHAI)
            VALUES (?, ?, ?, ?, ?, ?, 50, 35, 30, 'Active')
        ''', (data['MATK'], data['TENTK'], data['TONGTIENHT'], data['HANMUCVAY'],
              data['TIENVAY'], data['TLKQHIENTAI']))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/taikhoan/<matk>', methods=['PUT'])
def update_taikhoan(matk):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE TKKYQUY SET TENTK=?, TONGTIENHT=?, HANMUCVAY=?, TIENVAY=?, 
                              TLKQHIENTAI=?, TRANGTHAI=? 
            WHERE MATK=?
        ''', (data.get('TENTK'), data.get('TONGTIENHT'), data.get('HANMUCVAY'),
              data.get('TIENVAY'), data.get('TLKQHIENTAI'), data.get('TRANGTHAI'), matk))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/taikhoan/<matk>', methods=['DELETE'])
def delete_taikhoan(matk):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM TKKYQUY WHERE MATK = ?', (matk,))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== API ENDPOINTS - CHUNG KHOAN =====
@app.route('/api/chungkhoan', methods=['GET'])
def get_chungkhoan():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM CHUNGKHOAN ORDER BY MACK')
        cks = rows_to_dict_list(cursor)
        conn.close()
        return jsonify(cks), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chungkhoan', methods=['POST'])
def create_chungkhoan():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO CHUNGKHOAN (MACK, TENCTY, GIAHT, GIATRAN, GIASAN, TYLECHOVAY)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data['MACK'], data['TENCTY'], data['GIAHT'], data['GIATRAN'],
              data['GIASAN'], data['TYLECHOVAY']))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chungkhoan/<mack>', methods=['PUT'])
def update_chungkhoan(mack):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE CHUNGKHOAN SET TENCTY=?, GIAHT=?, GIATRAN=?, GIASAN=?, TYLECHOVAY=?
            WHERE MACK=?
        ''', (data.get('TENCTY'), data.get('GIAHT'), data.get('GIATRAN'),
              data.get('GIASAN'), data.get('TYLECHOVAY'), mack))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chungkhoan/<mack>', methods=['DELETE'])
def delete_chungkhoan(mack):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM CHUNGKHOAN WHERE MACK = ?', (mack,))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== API ENDPOINTS - VITHE =====
@app.route('/api/vithe', methods=['GET'])
def get_vithe():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM VITHE ORDER BY MATK, MACK')
        vithe = rows_to_dict_list(cursor)
        conn.close()
        return jsonify(vithe), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vithe/<matk>/<mack>', methods=['GET'])
def get_vithe_detail(matk, mack):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM VITHE WHERE MATK = ? AND MACK = ?', (matk, mack))
        vt = row_to_dict(cursor, cursor.fetchone())
        conn.close()
        if vt:
            return jsonify(vt), 200
        return jsonify({'error': 'Not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vithe', methods=['POST'])
def create_vithe():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO VITHE (MATK, MACK, SLTONG, GIAVON, GIAHIENTAI, GTTHECHAP)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (data['MATK'], data['MACK'], data['SLTONG'], data['GIAVON'],
              data['GIAHIENTAI'], data['GTTHECHAP']))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vithe/<matk>/<mack>', methods=['PUT'])
def update_vithe(matk, mack):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE VITHE SET SLTONG=?, GIAVON=?, GIAHIENTAI=?, GTTHECHAP=?
            WHERE MATK=? AND MACK=?
        ''', (data.get('SLTONG'), data.get('GIAVON'), data.get('GIAHIENTAI'),
              data.get('GTTHECHAP'), matk, mack))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/vithe/<matk>/<mack>', methods=['DELETE'])
def delete_vithe(matk, mack):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM VITHE WHERE MATK = ? AND MACK = ?', (matk, mack))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== API ENDPOINTS - LENHGD =====
@app.route('/api/lenhgd', methods=['GET'])
def get_lenhgd():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM LENHGD ORDER BY THOIGIANDAT DESC')
        lenhs = rows_to_dict_list(cursor)
        conn.close()
        return jsonify(lenhs), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lenhgd', methods=['POST'])
def create_lenhgd():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO LENHGD (MALENH, LOAILENH, SLDAT, GIADAT, TRANGTHAI, THOIGIANDAT, MATK, MACK)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (data['MALENH'], data['LOAILENH'], data['SLDAT'], data['GIADAT'],
              data['TRANGTHAI'], datetime.now(), data['MATK'], data['MACK']))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lenhgd/<malenh>', methods=['PUT'])
def update_lenhgd(malenh):
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE LENHGD SET LOAILENH=?, SLDAT=?, GIADAT=?, TRANGTHAI=?
            WHERE MALENH=?
        ''', (data.get('LOAILENH'), data.get('SLDAT'), data.get('GIADAT'),
              data.get('TRANGTHAI'), malenh))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lenhgd/<malenh>', methods=['DELETE'])
def delete_lenhgd(malenh):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM LENHGD WHERE MALENH = ?', (malenh,))
        conn.commit()
        conn.close()
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== HEALTH CHECK =====
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'API is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')