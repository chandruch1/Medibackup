import { useEffect, useState } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { AppointmentDonutChart } from "../../components/dashboard/AppointmentChart";
import Loader from "../../components/common/Loader";
import { getDoctorDashboard } from "../../services/dashboardService";
import {
    FaCalendarCheck, FaHourglass, FaCheckCircle, FaTimesCircle, FaTasks
} from "react-icons/fa";

function DoctorDashboard() {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDoctorDashboard()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <DoctorLayout title="Dashboard"><Loader text="Loading dashboard..." /></DoctorLayout>;
    }

    const d = data || {};

    return (
        <DoctorLayout title="Doctor Dashboard" subtitle="Your appointment overview for today">
            {/* Stat Cards */}
            <div className="row mb-2">
                <DashboardCard title="Total Appointments"  value={d.totalAppointments}     icon={<FaCalendarCheck />} colorClass="blue" />
                <DashboardCard title="Pending"             value={d.pendingAppointments}   icon={<FaHourglass />}     colorClass="orange" />
                <DashboardCard title="Approved"            value={d.approvedAppointments}  icon={<FaCheckCircle />}   colorClass="teal" />
                <DashboardCard title="Completed"           value={d.completedAppointments} icon={<FaTasks />}         colorClass="green" />
                <DashboardCard title="Rejected"            value={d.rejectedAppointments}  icon={<FaTimesCircle />}   colorClass="red" />
            </div>

            {/* Chart */}
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <AppointmentDonutChart
                        d={[
                            d.pendingAppointments,
                            d.approvedAppointments,
                            d.completedAppointments,
                            d.rejectedAppointments,
                        ]}
                        labels={["Pending", "Approved", "Completed", "Rejected"]}
                        colors={["#ffc107", "#20c997", "#198754", "#dc3545"]}
                        title="Appointment Breakdown"
                    />
                </div>
                <div className="col-lg-7 mb-4">
                    <div className="ms-card h-100" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div className="ms-card-header">Quick Summary</div>
                        {[
                            { label: "Total Appointments",   value: d.totalAppointments,     color: "#0d6efd" },
                            { label: "Pending Review",       value: d.pendingAppointments,   color: "#ffc107" },
                            { label: "Approved",             value: d.approvedAppointments,  color: "#20c997" },
                            { label: "Completed",            value: d.completedAppointments, color: "#198754" },
                            { label: "Rejected",             value: d.rejectedAppointments,  color: "#dc3545" },
                        ].map(row => (
                            <div key={row.label} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "12px 0", borderBottom: "1px solid var(--border-color)"
                            }}>
                                <span style={{ fontSize: 14, color: "var(--gray-600)" }}>{row.label}</span>
                                <span style={{
                                    fontWeight: 700, fontSize: 18, color: row.color,
                                    minWidth: 36, textAlign: "right"
                                }}>{row.value || 0}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
}

export default DoctorDashboard;
