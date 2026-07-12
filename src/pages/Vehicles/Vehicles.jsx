import MainLayout from "../../components/layout/MainLayout";

import VehicleTable from "../../components/vehicles/VehicleTable";
import AddVehicleModal from "../../components/vehicles/AddVehicleModal";

function Vehicles() {

  return (

    <MainLayout>

      <div className="d-flex justify-content-between mb-4">

        <h2>Vehicles</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#vehicleModal"
        >
          Add Vehicle
        </button>

      </div>

      <VehicleTable />

      <AddVehicleModal />

    </MainLayout>

  );

}

export default Vehicles;