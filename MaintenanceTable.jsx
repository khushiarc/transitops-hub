import { FaEdit, FaTrash } from "react-icons/fa";

const maintenance = [
  {
    id: 1,
    vehicle: "MH12AB1234",
    issue: "Oil Change",
    priority: "High",
    dueDate: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: 2,
    vehicle: "MH14CD5678",
    issue: "Brake Inspection",
    priority: "Medium",
    dueDate: "22 Jul 2026",
    status: "In Progress",
  },
  {
    id: 3,
    vehicle: "MH01EF9012",
    issue: "Tyre Replacement",
    priority: "Low",
    dueDate: "25 Jul 2026",
    status: "Completed",
  },
];

function MaintenanceTable() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Vehicle</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {maintenance.map((item) => (

              <tr key={item.id}>

                <td>{item.vehicle}</td>

                <td>{item.issue}</td>

                <td>

                  <span
                    className={`badge ${
                      item.priority === "High"
                        ? "bg-danger"
                        : item.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {item.priority}
                  </span>

                </td>

                <td>{item.dueDate}</td>

                <td>

                  <span
                    className={`badge ${
                      item.status === "Completed"
                        ? "bg-success"
                        : item.status === "Pending"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <button className="btn btn-warning btn-sm me-2">
                    <FaEdit/>
                  </button>

                  <button className="btn btn-danger btn-sm">
                    <FaTrash/>
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

export default MaintenanceTable;