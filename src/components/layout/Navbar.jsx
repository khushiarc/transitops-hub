import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar(){

    return(

        <nav className="navbar bg-white shadow-sm px-4">

            <h4 className="mb-0">
                Smart Transport Management
            </h4>

            <div className="d-flex align-items-center">

                <FaBell size={20} className="me-4"/>

                <FaUserCircle size={30}/>

            </div>

        </nav>

    )

}

export default Navbar;