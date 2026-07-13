import api from "../api/api";

// ── Admin Dashboard (single API call) ─────────────────────────────────────────
export const getDashboardData = async () => {
    const response = await api.get("/dashboard");
    return response.data;
    // { totalDoctors, totalPatients, totalAppointments, bookedAppointments, completedAppointments, cancelledAppointments }
};

// ── Doctor Dashboard ──────────────────────────────────────────────────────────
export const getDoctorDashboard = async () => {
    const response = await api.get("/doctors/dashboard");
    return response.data;
    // { totalAppointments, pendingAppointments, approvedAppointments, completedAppointments, rejectedAppointments }
};

// ── Patient Dashboard ─────────────────────────────────────────────────────────
export const getPatientDashboard = async () => {
    const response = await api.get("/patients/dashboard");
    return response.data;
    // { totalAppointments, pendingAppointments, approvedAppointments, completedAppointments, cancelledAppointments }
};