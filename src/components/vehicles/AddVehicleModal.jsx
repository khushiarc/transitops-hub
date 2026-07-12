function AddVehicleModal() {
  return (
    <div
      className="modal fade"
      id="vehicleModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>Add Vehicle</h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              placeholder="Vehicle Number"
            />

            <input
              className="form-control mb-3"
              placeholder="Vehicle Type"
            />

            <input
              className="form-control mb-3"
              placeholder="Driver"
            />

            <input
              className="form-control"
              placeholder="Capacity"
            />

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-primary"
            >
              Save
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddVehicleModal;