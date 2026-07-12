import { FaEdit, FaTrash } from "react-icons/fa";

const trips = [
  {
    id: "TRP001",
    vehicle: "MH12AB1234",
    driver: "Rahul Sharma",
    source: "Pune",
    destination: "Mumbai",
    status: "Active",
  },
  {
    id: "TRP002",
    vehicle: "MH14CD5678",
    driver: "Priya Singh",
    source: "Pune",
    destination: "Nashik",
    status: "Completed",
  },
];

function TripTable() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">

        <table className="table table-hover">

          <thead className="table-dark">

            <tr>

              <th>Trip ID</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {trips.map((trip)=>(

              <tr key={trip.id}>

                <td>{trip.id}</td>

                <td>{trip.vehicle}</td>

                <td>{trip.driver}</td>

                <td>{trip.source}</td>

                <td>{trip.destination}</td>

                <td>

                  <span className={`badge ${
                    trip.status==="Active"
                    ?"bg-primary"
                    :"bg-success"
                  }`}>

                    {trip.status}

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

export default TripTable;