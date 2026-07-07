import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";

import { getDashboardData } from "../../services/dashboardService";
import AppointmentChart from "../../components/dashboard/AppointmentChart";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardData();

            setDashboard(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {

        return (

            <AdminLayout>

                <h4>Loading Dashboard...</h4>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row">

                <DashboardCard
                    title="Doctors"
                    value={dashboard.totalDoctors}
                    icon="👨‍⚕️"
                    color="#0d6efd"
                />

                <DashboardCard
                    title="Patients"
                    value={dashboard.totalPatients}
                    icon="🧑"
                    color="#20c997"
                />

                <DashboardCard
                    title="Appointments"
                    value={dashboard.totalAppointments}
                    icon="📅"
                    color="#fd7e14"
                />

                <DashboardCard
                    title="Booked"
                    value={dashboard.bookedAppointments}
                    icon="🟦"
                    color="#0d6efd"
                />

                <DashboardCard
                    title="Completed"
                    value={dashboard.completedAppointments}
                    icon="✅"
                    color="#198754"
                />

                <DashboardCard
                    title="Cancelled"
                    value={dashboard.cancelledAppointments}
                    icon="❌"
                    color="#dc3545"
                />
                <AppointmentChart
                    dashboard={dashboard}
                />

            </div>

        </AdminLayout>

    );

}

export default Dashboard;