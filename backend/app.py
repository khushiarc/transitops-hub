from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

# ==========================================
# GET ROUTES (Unblocks the frontend)
# ==========================================

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Vehicles")
        return jsonify(cursor.fetchall()), 200
    finally:
        cursor.close()
        conn.close()

@app.route('/api/drivers', methods=['GET'])
def get_drivers():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Drivers")
        return jsonify(cursor.fetchall()), 200
    finally:
        cursor.close()
        conn.close()
        
from flask import request

# --- TRIPS ENDPOINT ---
@app.route('/api/trips', methods=['GET'])
def get_trips():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        # dictionary=True formats the SQL rows perfectly for JSON
        cursor = conn.cursor(dictionary=True) 
        cursor.execute("SELECT * FROM trips")
        trips = cursor.fetchall()
        
        return {"data": trips}, 200
        
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        if 'cursor' in locals():
            cursor.close()

# ==========================================
# POST ROUTES (The Core Engine)
# ==========================================

@app.route('/api/trips/dispatch', methods=['POST'])
def dispatch_trip():
    data = request.json
    vehicle_id = data.get('vehicle_id')
    driver_id = data.get('driver_id')
    cargo_weight = float(data.get('cargo_weight_kg', 0))
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    cursor = conn.cursor(dictionary=True)
    
    try:
        # --- VALIDATION PHASE ---
        
        # 1. Check Vehicle Capacity and Status
        cursor.execute("SELECT max_capacity_kg, status FROM Vehicles WHERE id = %s", (vehicle_id,))
        vehicle = cursor.fetchone()
        
        if not vehicle:
            return jsonify({"error": "Vehicle not found"}), 404
        if vehicle['status'] != 'Available':
            return jsonify({"error": "Vehicle is not available"}), 400
        if cargo_weight > float(vehicle['max_capacity_kg']):
            return jsonify({
                "error": "Cargo exceeds max capacity", 
                "max_capacity": float(vehicle['max_capacity_kg'])
            }), 400
            
        # 2. Check Driver Status
        cursor.execute("SELECT status FROM Drivers WHERE id = %s", (driver_id,))
        driver = cursor.fetchone()
        
        if not driver:
            return jsonify({"error": "Driver not found"}), 404
        if driver['status'] != 'Available':
            return jsonify({"error": "Driver is not available"}), 400

        # --- TRANSACTION PHASE ---
        
        # 3. Create the Trip
        trip_query = """
            INSERT INTO Trips (vehicle_id, driver_id, source, destination, cargo_weight_kg, status)
            VALUES (%s, %s, %s, %s, %s, 'Dispatched')
        """
        cursor.execute(trip_query, (vehicle_id, driver_id, data['source'], data['destination'], cargo_weight))
        
        # 4. Update Statuses
        cursor.execute("UPDATE Vehicles SET status = 'On Trip' WHERE id = %s", (vehicle_id,))
        cursor.execute("UPDATE Drivers SET status = 'On Trip' WHERE id = %s", (driver_id,))
        
        # 5. Commit everything
        conn.commit()
        return jsonify({"message": "Trip successfully dispatched!"}), 201
        
    except Exception as e:
        # If anything fails, undo all changes
        conn.rollback()
        return jsonify({"error": "Dispatch failed", "details": str(e)}), 500
        
    finally:
        cursor.close()
        conn.close()

@app.route('/api/maintenance', methods=['GET', 'POST'])
def handle_maintenance():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    try:
        # --- GET: Fetch all maintenance logs ---
        if request.method == 'GET':
            # dictionary=True maps the SQL rows directly into JSON objects for the frontend
            cursor = conn.cursor(dictionary=True)
            
            # Ordering by date descending is a great touch for the UI dashboard
            cursor.execute("SELECT * FROM Maintenance_Logs ORDER BY log_date DESC")
            logs = cursor.fetchall()
            cursor.close()
            
            return jsonify({"data": logs}), 200

        # --- POST: Add a new maintenance log ---
        elif request.method == 'POST':
            cursor = conn.cursor()
            data = request.json
            vehicle_id = data.get('vehicle_id')
            description = data.get('description')
            cost = float(data.get('cost', 0))
            log_date = data.get('log_date')
            
            # 1. Insert the Maintenance Log
            log_query = """
                INSERT INTO Maintenance_Logs (vehicle_id, description, cost, log_date)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(log_query, (vehicle_id, description, cost, log_date))
            
            # 2. Update Vehicle Status to 'In Shop'
            cursor.execute("UPDATE Vehicles SET status = 'In Shop' WHERE id = %s", (vehicle_id,))
            
            # 3. Commit the transaction
            conn.commit()
            cursor.close()
            
            return jsonify({"message": "Maintenance logged and vehicle moved to In Shop!"}), 201
            
    except Exception as e:
        conn.rollback() # Protects your database if something breaks midway
        return jsonify({"error": "Database operation failed", "details": str(e)}), 500
        
    finally:
        # Ensure the connection is always closed, preventing memory leaks
        conn.close()
        

@app.route('/api/fuel', methods=['GET', 'POST'])
def handle_fuel_log():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    try:
        # --- GET: Fetch all fuel logs ---
        if request.method == 'GET':
            cursor = conn.cursor(dictionary=True)
            # Ordering by date descending keeps the UI dashboard fresh
            cursor.execute("SELECT * FROM Fuel_Logs ORDER BY log_date DESC")
            logs = cursor.fetchall()
            cursor.close()
            
            return jsonify({"data": logs}), 200

        # --- POST: Add a new fuel log ---
        elif request.method == 'POST':
            cursor = conn.cursor()
            data = request.json
            vehicle_id = data.get('vehicle_id')
            liters = float(data.get('liters', 0))
            cost = float(data.get('cost', 0))
            log_date = data.get('log_date')
            
            log_query = """
                INSERT INTO Fuel_Logs (vehicle_id, liters, cost, log_date)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(log_query, (vehicle_id, liters, cost, log_date))
            
            conn.commit()
            cursor.close()
            
            return jsonify({"message": "Fuel log added successfully!"}), 201
            
    except Exception as e:
        conn.rollback() # Undo any partial database changes if an error occurs
        return jsonify({"error": "Failed to process fuel log", "details": str(e)}), 500
        
    finally:
        conn.close()
        
        
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    cursor = conn.cursor(dictionary=True)
    
    try:
        # 1. Quick KPI Counts (For the top row of the dashboard)
        kpi_query = """
            SELECT 
                (SELECT COUNT(*) FROM Vehicles WHERE status = 'Available') AS available_vehicles,
                (SELECT COUNT(*) FROM Vehicles WHERE status = 'On Trip') AS active_vehicles,
                (SELECT COUNT(*) FROM Vehicles WHERE status = 'In Shop') AS maintenance_vehicles,
                (SELECT COUNT(*) FROM Vehicles) AS total_vehicles,
                (SELECT COUNT(*) FROM Trips WHERE status = 'Dispatched') AS active_trips,
                (SELECT COUNT(*) FROM Trips WHERE status = 'Draft') AS pending_trips,
                (SELECT COUNT(*) FROM Drivers WHERE status = 'On Trip') AS drivers_on_duty
        """
        cursor.execute(kpi_query)
        kpis = cursor.fetchone()
        
        # Calculate Fleet Utilization % safely (avoid division by zero)
        total = kpis['total_vehicles']
        kpis['fleet_utilization_pct'] = (kpis['active_vehicles'] / total * 100) if total > 0 else 0

        # 2. Operational Cost & ROI per Vehicle (For the charts/tables)
        # We use subqueries here to prevent SQL cartesian product multiplication bugs!
        cost_query = """
            SELECT 
                v.id,
                v.registration_no,
                v.acquisition_cost,
                COALESCE((SELECT SUM(cost) FROM Maintenance_Logs WHERE vehicle_id = v.id), 0) AS total_maintenance,
                COALESCE((SELECT SUM(cost) FROM Fuel_Logs WHERE vehicle_id = v.id), 0) AS total_fuel,
                (
                    COALESCE((SELECT SUM(cost) FROM Maintenance_Logs WHERE vehicle_id = v.id), 0) + 
                    COALESCE((SELECT SUM(cost) FROM Fuel_Logs WHERE vehicle_id = v.id), 0)
                ) AS total_operational_cost
            FROM Vehicles v
        """
        cursor.execute(cost_query)
        vehicle_costs = cursor.fetchall()

        # 3. Package it all up in one clean JSON response
        dashboard_data = {
            "kpis": kpis,
            "vehicle_analytics": vehicle_costs
        }
        
        return jsonify(dashboard_data), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to fetch analytics", "details": str(e)}), 500
        
    finally:
        cursor.close()
        conn.close()

# ==========================================
# SERVER RUNNER
# ==========================================

if __name__ == '__main__':
    # debug=True automatically restarts the server when you save this file!
    app.run(debug=True, port=5000)
