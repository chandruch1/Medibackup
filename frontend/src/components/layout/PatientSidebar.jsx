import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaCalendarPlus,
    FaCalendarCheck,
    FaSignOutAlt,
    FaHospital,
    FaUser,
    FaLock
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function PatientSidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="ms-sidebar patient-sidebar">
            {/* Brand */}
            <div className="ms-sidebar-brand">
                <div className="ms-sidebar-brand-logo">
                    <div className="ms-sidebar-brand-icon">
                        <FaHospital />
                    </div>
                    <div>
                        <div className="ms-sidebar-brand-text">MediSphere</div>
                        <div className="ms-sidebar-brand-subtitle">Patient Portal</div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <ul className="ms-sidebar-nav">
                <li className="ms-sidebar-section-label">Main Menu</li>

                <li className="ms-sidebar-item">
                    <NavLink to="/patient/dashboard" className={({ isActive }) =>
                        `ms-sidebar-link ${isActive ? "active" : ""}`
                    }>
                        <FaTachometerAlt />
                        Dashboard
                    </NavLink>
                </li>

                <li className="ms-sidebar-item">
                    <NavLink to="/patient/book" className={({ isActive }) =>
                        `ms-sidebar-link ${isActive ? "active" : ""}`
                    }>
                        <FaCalendarPlus />
                        Book Appointment
                    </NavLink>
                </li>

                <li className="ms-sidebar-item">
                    <NavLink to="/patient/appointments" className={({ isActive }) =>
                        `ms-sidebar-link ${isActive ? "active" : ""}`
                    }>
                        <FaCalendarCheck />
                        My Appointments
                    </NavLink>
                </li>

                <li className="ms-sidebar-section-label" style={{ marginTop: "8px" }}>Account</li>

                <li className="ms-sidebar-item">
                    <NavLink to="/patient/profile" className={({ isActive }) =>
                        `ms-sidebar-link ${isActive ? "active" : ""}`
                    }>
                        <FaUser />
                        Profile
                    </NavLink>
                </li>

                <li className="ms-sidebar-item">
                    <NavLink to="/patient/change-password" className={({ isActive }) =>
                        `ms-sidebar-link ${isActive ? "active" : ""}`
                    }>
                        <FaLock />
                        Change Password
                    </NavLink>
                </li>
            </ul>

            {/* Logout */}
            <div className="ms-sidebar-logout">
                <button
                    className="ms-sidebar-link w-100 border-0"
                    style={{ background: "rgba(220,53,69,0.1)", color: "#ef4444", cursor: "pointer" }}
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default PatientSidebar;
