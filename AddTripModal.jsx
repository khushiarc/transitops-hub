function AddTripModal(){

return(

<div
className="modal fade"
id="tripModal"
>

<div className="modal-dialog modal-lg">

<div className="modal-content">

<div className="modal-header">

<h5>Create Trip</h5>

<button
className="btn-close"
data-bs-dismiss="modal"
></button>

</div>

<div className="modal-body">

<div className="row">

<div className="col-md-6">

<label>Vehicle</label>

<select className="form-select mb-3">

<option>Select Vehicle</option>

<option>MH12AB1234</option>

<option>MH14CD5678</option>

</select>

</div>

<div className="col-md-6">

<label>Driver</label>

<select className="form-select mb-3">

<option>Select Driver</option>

<option>Rahul Sharma</option>

<option>Priya Singh</option>

</select>

</div>

</div>

<input
className="form-control mb-3"
placeholder="Source"
/>

<input
className="form-control mb-3"
placeholder="Destination"
/>

<input
type="date"
className="form-control"
/>

</div>

<div className="modal-footer">

<button className="btn btn-primary">

Create Trip

</button>

</div>

</div>

</div>

</div>

)

}

export default AddTripModal;