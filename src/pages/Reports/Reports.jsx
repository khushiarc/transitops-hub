import MainLayout from "../../components/layout/MainLayout";

import ReportCards from "../../components/reports/ReportCards";
import MonthlyTripsChart from "../../components/reports/MonthlyTripsChart";
import FuelCostChart from "../../components/reports/FuelCostChart";
import TopDrivers from "../../components/reports/TopDrivers";

function Reports() {
  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports & Analytics</h2>

        <div>
          <button className="btn btn-outline-primary me-2">
            Export PDF
          </button>

          <button className="btn btn-primary">
            Export CSV
          </button>
        </div>
      </div>

      <ReportCards />

      <div className="row mb-4">
        <div className="col-lg-6">
          <MonthlyTripsChart />
        </div>

        <div className="col-lg-6">
          <FuelCostChart />
        </div>
      </div>

      <TopDrivers />
    </MainLayout>
  );
}

export default Reports;