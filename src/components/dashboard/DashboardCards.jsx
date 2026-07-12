import {
    FaTruck,
    FaCheckCircle,
    FaUserTie,
    FaRoute
} from "react-icons/fa";

function DashboardCards({kpis}){

const cards=[

{
title:"Total Vehicles",
value:kpis.total_vehicles,
icon:<FaTruck size={30}/>,
color:"primary"
},

{
title:"Active Vehicles",
value:kpis.active_vehicles,
icon:<FaTruck size={30}/>,
color:"success"
},

{
title:"Drivers On Duty",
value:kpis.drivers_on_duty,
icon:<FaUserTie size={30}/>,
color:"warning"
},

{
title:"Active Trips",
value:kpis.active_trips,
icon:<FaRoute size={30}/>,
color:"danger"
}

];

return(

<div className="row">

{
cards.map((card,index)=>(

<div
className="col-lg-3 col-md-6 mb-3"
key={index}
>

<div className={`card border-start border-5 border-${card.color} shadow border-0 rounded-4`}>

<div className="card-body d-flex justify-content-between">

<div>

<small>{card.title}</small>

<h2>{card.value}</h2>

</div>

<div className={`text-${card.color}`}>

{card.icon}

</div>

</div>

</div>

</div>

))
}

</div>

)

}

export default DashboardCards;