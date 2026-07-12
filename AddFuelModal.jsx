function AddFuelModal() {
  return (
    <div className="modal fade" id="fuelModal">

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5>Add Fuel Entry</h5>

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

            <select className="form-select mb-3">

              <option>Fuel Type</option>

              <option>Diesel</option>

              <option>Petrol</option>

              <option>CNG</option>

            </select>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Liters"
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Cost"
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Odometer"
            />

            <input
              type="date"
              className="form-control"
            />

          </div>

          <div className="modal-footer">

            <button className="btn btn-primary">

              Save Entry

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddFuelModal;