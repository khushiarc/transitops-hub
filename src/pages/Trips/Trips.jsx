import MainLayout from "../../components/layout/MainLayout";
import TripTable from "../../components/trips/TripTable";
import AddTripModal from "../../components/trips/AddTripModal";

function Trips(){

return(

<MainLayout>

<div className="d-flex justify-content-between align-items-center mb-4">

<h2>Trips</h2>

<button
className="btn btn-primary"
data-bs-toggle="modal"
data-bs-target="#tripModal"
>

Create Trip

</button>

</div>

<TripTable/>

<AddTripModal/>

</MainLayout>

)

}

export default Trips;