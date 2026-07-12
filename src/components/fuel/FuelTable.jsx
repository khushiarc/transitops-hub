import { FaEdit, FaTrash } from "react-icons/fa";

const fuelData = [
  {
    id: 1,
    vehicle: "MH12AB1234",
    type: "Diesel",
    liters: 50,
    cost: 5200,
    odometer: 120500,
    date: "12 Jul 2026",
  },
  {
    id: 2,
    vehicle: "MH14CD5678",
    type: "Petrol",
    liters: 40,
    cost: 4100,
    odometer: 87500,
    date: "10 Jul 2026",
  },
];

function FuelTable() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Vehicle</th>
              <th>Fuel Type</th>
              <th>Liters</th>
              <th>Cost (₹)</th>
              <th>Odometer</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {fuelData.map((fuel) => (

              <tr key={fuel.id}>

                <td>{fuel.vehicle}</td>

                <td>{fuel.type}</td>

                <td>{fuel.liters} L</td>

                <td>₹ {fuel.cost}</td>

                <td>{fuel.odometer}</td>

                <td>{fuel.date}</td>

                <td>

                  <button className="btn btn-warning btn-sm me-2">
                    <FaEdit />
                  </button>

                  <button className="btn btn-danger btn-sm">
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

export default FuelTable;