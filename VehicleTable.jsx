import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getVehicles } from "../../services/vehicleService";

function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Registration No</th>
              <th>Model</th>
              <th>Capacity (kg)</th>
              <th>Acquisition Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id}>

                  <td>{vehicle.id}</td>

                  <td>{vehicle.registration_no}</td>

                  <td>{vehicle.model}</td>

                  <td>{vehicle.max_capacity_kg}</td>

                  <td>₹ {vehicle.acquisition_cost}</td>

                  <td>
                    <span
                      className={`badge ${
                        vehicle.status === "Available"
                          ? "bg-success"
                          : vehicle.status === "Maintenance"
                          ? "bg-warning text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      disabled
                      title="Edit coming soon"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      disabled
                      title="Delete coming soon"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No vehicles found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default VehicleTable;