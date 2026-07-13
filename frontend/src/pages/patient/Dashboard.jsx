import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { StatsBarChart } from "../../components/dashboard/AppointmentChart";
import Loader from "../../components/common/Loader";
import { getPatientDashboard } from "../../services/dashboardService";
import { FaCalendarCheck, FaHourglass, FaCheckCircle, FaTimesCircle, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";

function PatientDashboard() {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPatientDashboard()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <PatientLayout title="Dashboard"><Loader text="Loading dashboard..." /></PatientLayout>;
    }

    const d = data || {};

    return (
        <PatientLayout title="My Dashboard" subtitle="Track your healthcare journey">
            {/* Stat Cards */}
            <div className="row mb-2">
                <DashboardCard title="Total Appointments"  value={d.totalAppointments}     icon={<FaCalendarCheck />} colorClass="blue" />
                <DashboardCard title="Pending"             value={d.pendingAppointments}   icon={<FaHourglass />}     colorClass="orange" />
                <DashboardCard title="Approved"            value={d.approvedAppointments}  icon={<FaCheckCircle />}   colorClass="teal" />
                <DashboardCard title="Completed"           value={d.completedAppointments} icon={<FaCheckCircle />}   colorClass="green" />
                <DashboardCard title="Cancelled"           value={d.cancelledAppointments} icon={<FaBan />}           colorClass="red" />
            </div>

            {/* Chart + Quick Action */}
            <div className="row">
                <div className="col-lg-7 mb-4">
                    <StatsBarChart
                        labels={["Pending", "Approved", "Completed", "Cancelled"]}
                        values={[d.pendingAppointments, d.approvedAppointments, d.completedAppointments, d.cancelledAppointments]}
                        colors={["#ffc107", "#20c997", "#198754", "#dc3545"]}
                        title="Appointment History"
                    />
                </div>
                <div className="col-lg-5 mb-4">
                    <div className="ms-card h-100" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="ms-card-header">Quick Actions</div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                            <Link to="/patient/book" style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px",
                                background: "linear-gradient(135deg, #0d6efd, #0a58ca)",
                                borderRadius: 12, textDecoration: "none", color: "#fff"
                            }}>
                                <div style={{ fontSize: 28 }}>📅</div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>Book Appointment</div>
                                    <div style={{ fontSize: 12, opacity: 0.8 }}>Schedule with a doctor</div>
                                </div>
                            </Link>
                            <Link to="/patient/appointments" style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px",
                                background: "linear-gradient(135deg, #20c997, #17a589)",
                                borderRadius: 12, textDecoration: "none", color: "#fff"
                            }}>
                                <div style={{ fontSize: 28 }}>📋</div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>My Appointments</div>
                                    <div style={{ fontSize: 12, opacity: 0.8 }}>View all bookings</div>
                                </div>
                            </Link>
                            <Link to="/patient/profile" style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px",
                                background: "linear-gradient(135deg, #6f42c1, #5a329a)",
                                borderRadius: 12, textDecoration: "none", color: "#fff"
                            }}>
                                <div style={{ fontSize: 28 }}>👤</div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>My Profile</div>
                                    <div style={{ fontSize: 12, opacity: 0.8 }}>Update your information</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}

export default PatientDashboard;
