import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getDrivers,
  deleteDriver,
} from "../../services/driverService";

function DriverTable() {

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const res = await getDrivers();
      setDrivers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDriver(id);
      loadDrivers();
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="card shadow border-0 rounded-4">

      <div className="card-body">

        <table className="table table-hover">

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

            {drivers.map((driver) => (

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

                  <button className="btn btn-warning btn-sm me-2">
                    <FaEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(driver.id)}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default DriverTable;