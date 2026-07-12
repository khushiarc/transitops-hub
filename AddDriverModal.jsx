function AddDriverModal() {
  return (
    <div className="modal fade" id="driverModal">

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>Add Driver</h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            <input
              className="form-control mb-3"
              placeholder="Driver Name"
            />

            <input
              className="form-control mb-3"
              placeholder="License Number"
            />

            <input
              className="form-control mb-3"
              placeholder="Phone Number"
            />

            <input
              className="form-control"
              placeholder="Assigned Vehicle"
            />

          </div>

          <div className="modal-footer">

            <button className="btn btn-primary">

              Save Driver

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddDriverModal;