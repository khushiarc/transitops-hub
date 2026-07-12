import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getDrivers } from "../../services/driverService";

function DriverTable() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(res.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
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
              <th>Name</th>
              <th>License No</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver.id}>

                  <td>{driver.id}</td>

                  <td>{driver.name}</td>

                  <td>{driver.license_no}</td>

                  <td>
                    <span
                      className={`badge ${
                        driver.status === "Available"
                          ? "bg-success"
                          : "bg-primary"
                      }`}
                    >
                      {driver.status}
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
                <td colSpan="5" className="text-center">
                  No drivers found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default DriverTable;