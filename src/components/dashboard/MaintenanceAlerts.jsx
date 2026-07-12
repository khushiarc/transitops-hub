const alerts = [
  {
    id: 1,
    vehicle: "MH12AB1234",
    issue: "Oil Change",
    priority: "High",
  },
  {
    id: 2,
    vehicle: "MH14CD5678",
    issue: "Brake Inspection",
    priority: "Medium",
  },
  {
    id: 3,
    vehicle: "MH01EF9012",
    issue: "Tyre Replacement",
    priority: "Low",
  },
];

function MaintenanceAlerts() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">
        <h5 className="mb-3">Maintenance Alerts</h5>

        <ul className="list-group">
          {alerts.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.vehicle}</strong>
                <br />
                <small>{item.issue}</small>
              </div>

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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MaintenanceAlerts;