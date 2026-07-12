import MainLayout from "../../components/layout/MainLayout";
import FuelTable from "../../components/fuel/FuelTable";
import AddFuelModal from "../../components/fuel/AddFuelModal";

function Fuel() {
  return (
    <MainLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Fuel Management</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#fuelModal"
        >
          Add Fuel Entry
        </button>

      </div>

      <FuelTable />

      <AddFuelModal />

    </MainLayout>
  );
}

export default Fuel;