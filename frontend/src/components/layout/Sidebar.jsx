import { NavLink } from "react-router-dom";

import {
    FaTachometerAlt,
    FaUserMd,
    FaUsers,
    FaCalendarCheck,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    return (

        <div
            className="bg-dark text-white p-3 shadow"
            style={{
                width: "260px",
                minHeight: "100vh"
            }}
        >

            <h3 className="text-center mb-4">

                🏥 MediSphere

            </h3>

            <ul className="nav flex-column">

                <li className="nav-item mb-2">

                    <NavLink
                        to="/admin/dashboard"
                        className="nav-link text-white"
                    >

                        <FaTachometerAlt className="me-2"/>

                        Dashboard

                    </NavLink>

                </li>

                <li className="nav-item mb-2">

                    <NavLink
                        to="/admin/doctors"
                        className="nav-link text-white"
                    >

                        <FaUserMd className="me-2"/>

                        Doctors

                    </NavLink>

                </li>

                <li className="nav-item mb-2">

                    <NavLink
                        to="/admin/patients"
                        className="nav-link text-white"
                    >

                        <FaUsers className="me-2"/>

                        Patients

                    </NavLink>

                </li>

                <li className="nav-item mb-2">

                    <NavLink
                        to="/admin/appointments"
                        className="nav-link text-white"
                    >

                        <FaCalendarCheck className="me-2"/>

                        Appointments

                    </NavLink>

                </li>

                <hr/>

                <li className="nav-item">

                    <NavLink
                        to="/"
                        className="nav-link text-danger"
                        onClick={() => {

                            localStorage.clear();

                        }}
                    >

                        <FaSignOutAlt className="me-2"/>

                        Logout

                    </NavLink>

                </li>

            </ul>

        </div>

    );

}

export default Sidebar;