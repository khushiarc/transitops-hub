function AddMaintenanceModal() {
  return (
    <div
      className="modal fade"
      id="maintenanceModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>Schedule Maintenance</h5>

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
              placeholder="Issue"
            />

            <select className="form-select mb-3">
              <option>Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              className="form-control mb-3"
            />

            <select className="form-select">
              <option>Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <div className="modal-footer">

            <button className="btn btn-primary">
              Save
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddMaintenanceModal;