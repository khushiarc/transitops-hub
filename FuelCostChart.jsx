import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Fuel Cost",
      data: [35000, 42000, 39000, 47000, 51000, 58000],
      borderColor: "#198754",
      backgroundColor: "#198754",
    },
  ],
};

function FuelCostChart() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">
        <h5>Fuel Cost Trend</h5>
        <Line data={data} />
      </div>
    </div>
  );
}

export default FuelCostChart;