import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { AppointmentDonutChart, StatsBarChart } from "../../components/dashboard/AppointmentChart";
import Loader from "../../components/common/Loader";
import { getDashboardData } from "../../services/dashboardService";
import { FaUserMd, FaUsers, FaCalendarCheck, FaHourglass, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function AdminDashboard() {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardData()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <AdminLayout title="Dashboard"><Loader text="Loading dashboard..." /></AdminLayout>;
    }

    const d = data || {};

    return (
        <AdminLayout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
            {/* Stat Cards */}
            <div className="row mb-2">
                <DashboardCard title="Total Doctors"      value={d.totalDoctors}          icon={<FaUserMd />}         colorClass="blue" />
                <DashboardCard title="Total Patients"     value={d.totalPatients}          icon={<FaUsers />}          colorClass="teal" />
                <DashboardCard title="Total Appointments" value={d.totalAppointments}      icon={<FaCalendarCheck />}  colorClass="orange" />
                <DashboardCard title="Booked"             value={d.bookedAppointments}     icon={<FaHourglass />}      colorClass="purple" />
                <DashboardCard title="Completed"          value={d.completedAppointments}  icon={<FaCheckCircle />}    colorClass="green" />
                <DashboardCard title="Cancelled"          value={d.cancelledAppointments}  icon={<FaTimesCircle />}    colorClass="red" />
            </div>

            {/* Charts */}
            <div className="row">
                <div className="col-lg-5 mb-4">
                    <AppointmentDonutChart
                        d={[d.bookedAppointments, d.completedAppointments, d.cancelledAppointments]}
                        labels={["Booked", "Completed", "Cancelled"]}
                        colors={["#0d6efd", "#198754", "#dc3545"]}
                        title="Appointment Overview"
                    />
                </div>
                <div className="col-lg-7 mb-4">
                    <StatsBarChart
                        labels={["Doctors", "Patients", "Total Appointments", "Completed"]}
                        values={[d.totalDoctors, d.totalPatients, d.totalAppointments, d.completedAppointments]}
                        colors={["#0d6efd", "#20c997", "#fd7e14", "#198754"]}
                        title="Overall Statistics"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;