const trips = [
  {
    id: 1,
    vehicle: "MH12AB1234",
    driver: "Rahul Sharma",
    route: "Pune → Mumbai",
    status: "On Time",
  },
  {
    id: 2,
    vehicle: "MH14CD5678",
    driver: "Priya Singh",
    route: "Pune → Nashik",
    status: "Delayed",
  },
  {
    id: 3,
    vehicle: "MH01EF9012",
    driver: "Amit Patel",
    route: "Mumbai → Goa",
    status: "Completed",
  },
];

function RecentTrips() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">
        <h5 className="mb-3">Recent Trips</h5>

        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Route</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.vehicle}</td>
                <td>{trip.driver}</td>
                <td>{trip.route}</td>
                <td>
                  <span
                    className={`badge ${
                      trip.status === "Completed"
                        ? "bg-success"
                        : trip.status === "Delayed"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {trip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTrips;