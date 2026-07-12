import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Trips",
      data: [45, 62, 55, 78, 88, 102],
      backgroundColor: "#0d6efd",
    },
  ],
};

function MonthlyTripsChart() {
  return (
    <div className="card shadow border-0 rounded-4">
      <div className="card-body">
        <h5>Monthly Trips</h5>
        <Bar data={data} />
      </div>
    </div>
  );
}

export default MonthlyTripsChart;