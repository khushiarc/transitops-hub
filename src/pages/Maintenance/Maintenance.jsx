import MainLayout from "../../components/layout/MainLayout";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import AddMaintenanceModal from "../../components/maintenance/AddMaintenanceModal";

function Maintenance() {
  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Maintenance</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#maintenanceModal"
        >
          Schedule Maintenance
        </button>

      </div>

      <MaintenanceTable />

      <AddMaintenanceModal />

    </MainLayout>
  );
}

export default Maintenance;