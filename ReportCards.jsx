import {
  FaTruck,
  FaMoneyBillWave,
  FaRoute,
  FaUsers,
} from "react-icons/fa";

const reports = [
  {
    title: "Total Trips",
    value: 156,
    icon: <FaRoute size={30} />,
    color: "primary",
  },
  {
    title: "Fuel Cost",
    value: "₹ 1.85L",
    icon: <FaMoneyBillWave size={30} />,
    color: "danger",
  },
  {
    title: "Fleet Efficiency",
    value: "87%",
    icon: <FaTruck size={30} />,
    color: "success",
  },
  {
    title: "Active Drivers",
    value: 24,
    icon: <FaUsers size={30} />,
    color: "warning",
  },
];

function ReportCards() {
  return (
    <div className="row mb-4">
      {reports.map((item, index) => (
        <div className="col-lg-3 col-md-6 mb-3" key={index}>
          <div className={`card border-start border-5 border-${item.color} shadow border-0 rounded-4`}>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">{item.title}</small>
                <h3>{item.value}</h3>
              </div>
              <div className={`text-${item.color}`}>
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReportCards;