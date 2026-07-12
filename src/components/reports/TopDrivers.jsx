const drivers = [
  { name: "Rahul Sharma", trips: 45 },
  { name: "Priya Singh", trips: 39 },
  { name: "Amit Patil", trips: 35 },
  { name: "Sneha Joshi", trips: 30 },
];

function TopDrivers() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">
        <h5>Top Performing Drivers</h5>

        <table className="table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Trips</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index}>
                <td>{driver.name}</td>
                <td>{driver.trips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopDrivers;