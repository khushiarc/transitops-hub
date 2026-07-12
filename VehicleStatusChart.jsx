import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
}
from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function VehicleStatusChart({kpis}){

const data={

labels:[
"Available",
"Active",
"Maintenance"
],

datasets:[

{

data:[

kpis.available_vehicles,

kpis.active_vehicles,

kpis.maintenance_vehicles

],

backgroundColor:[

"#198754",

"#0d6efd",

"#ffc107"

]

}

]

};

return(

<div className="card shadow rounded-4 border-0">

<div className="card-body">

<h5>

Vehicle Status

</h5>

<Doughnut data={data}/>

</div>

</div>

)

}

export default VehicleStatusChart;