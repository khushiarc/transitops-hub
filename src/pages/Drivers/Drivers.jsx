import MainLayout from "../../components/layout/MainLayout";
import DriverTable from "../../components/drivers/DriverTable";
import AddDriverModal from "../../components/drivers/AddDriverModal";

function Drivers() {
  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Drivers</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#driverModal"
        >
          Add Driver
        </button>

      </div>

      <DriverTable />

      <AddDriverModal />

    </MainLayout>
  );
}

export default Drivers;