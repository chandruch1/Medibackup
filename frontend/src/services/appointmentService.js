import api from "../api/api";

export const getAppointments = async () => {

    const response = await api.get("/appointments");

    return response.data;

};

export const bookAppointment = async (appointment) => {

    const response = await api.post(
        "/appointments",
        appointment
    );

    return response.data;

};

export const updateAppointment = async (id, appointment) => {

    const response = await api.put(
        `/appointments/${id}`,
        appointment
    );

    return response.data;

};

export const deleteAppointment = async (id) => {

    const response = await api.delete(
        `/appointments/${id}`
    );

    return response.data;

};

export const completeAppointment = async (id) => {

    const response = await api.put(
        `/appointments/${id}/complete`
    );

    return response.data;

};

export const cancelAppointment = async (id) => {

    const response = await api.put(
        `/appointments/${id}/cancel`
    );

    return response.data;

};

export const searchAppointmentByPatient = async (patientName) => {

    if (!patientName.trim()) {

        return getAppointments();

    }

    const response = await api.get(
        `/appointments/search/patient?patientName=${patientName}`
    );

    return response.data;

};

export const searchAppointmentByDoctor = async (doctorName) => {

    const response = await api.get(
        `/appointments/search/doctor?doctorName=${doctorName}`
    );

    return response.data;

};

export const searchAppointmentByDate = async (date) => {

    const response = await api.get(
        `/appointments/search/date?date=${date}`
    );

    return response.data;

};

export const getAppointmentsPage = async (page, size) => {

    const response = await api.get(
        `/appointments/page?page=${page}&size=${size}`
    );

    return response.data;

};