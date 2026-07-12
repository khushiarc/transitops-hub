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
        
@app.route('/api/maintenance', methods=['POST'])
def add_maintenance():
    data = request.json
    vehicle_id = data.get('vehicle_id')
    description = data.get('description')
    cost = float(data.get('cost', 0))
    log_date = data.get('log_date')
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    cursor = conn.cursor()
    
    try:
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
        return jsonify({"message": "Maintenance logged and vehicle moved to In Shop!"}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to log maintenance", "details": str(e)}), 500
        
    finally:
        cursor.close()
        conn.close()
        
@app.route('/api/fuel', methods=['POST'])
def add_fuel_log():
    data = request.json
    vehicle_id = data.get('vehicle_id')
    liters = float(data.get('liters', 0))
    cost = float(data.get('cost', 0))
    log_date = data.get('log_date')
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
        
    cursor = conn.cursor()
    
    try:
        log_query = """
            INSERT INTO Fuel_Logs (vehicle_id, liters, cost, log_date)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(log_query, (vehicle_id, liters, cost, log_date))
        
        conn.commit()
        return jsonify({"message": "Fuel log added successfully!"}), 201
        
    except Exception as e:
        conn.rollback()
        return jsonify({"error": "Failed to log fuel", "details": str(e)}), 500
        
    finally:
        cursor.close()
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