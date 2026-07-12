import {
  FaTachometerAlt,
  FaTruck,
  FaUsers,
  FaRoute,
  FaTools,
  FaGasPump,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menu = [
        {name:"Dashboard",icon:<FaTachometerAlt/>,path:"/dashboard"},
        {name:"Vehicles",icon:<FaTruck/>,path:"/vehicles"},
        {name:"Drivers",icon:<FaUsers/>,path:"/drivers"},
        {name:"Trips",icon:<FaRoute/>,path:"/trips"},
        {name:"Maintenance",icon:<FaTools/>,path:"/maintenance"},
        {name:"Fuel",icon:<FaGasPump/>,path:"/fuel"},
        {name:"Reports",icon:<FaChartBar/>,path:"/reports"}
    ];

    return(

        <div className="bg-dark text-white vh-100 p-3" style={{width:"250px"}}>

            <h3 className="text-center mb-4">
                🚛 TransitOps
            </h3>

            {menu.map((item)=>(
                <NavLink
                    key={item.name}
                    to={item.path}
                    className="d-flex align-items-center text-white text-decoration-none p-2 mb-2 rounded"
                >
                    <span className="me-2">{item.icon}</span>
                    {item.name}
                </NavLink>
            ))}

            <NavLink
                to="/"
                className="d-flex align-items-center text-danger text-decoration-none p-2 mt-5"
            >
                <FaSignOutAlt className="me-2"/>
                Logout
            </NavLink>

        </div>

    )

}

export default Sidebar;