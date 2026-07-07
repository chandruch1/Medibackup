import api from "../api/api";

export const getPatients = async () => {

    const response = await api.get("/patients");

    return response.data;

};

export const addPatient = async (patient) => {

    const response = await api.post("/patients", patient);

    return response.data;

};

export const updatePatient = async (id, patient) => {

    const response = await api.put(`/patients/${id}`, patient);

    return response.data;

};

export const deletePatient = async (id) => {

    const response = await api.delete(`/patients/${id}`);

    return response.data;

};

export const searchPatientByName = async (name) => {

    if (!name.trim()) {

        return getPatients();

    }

    const response = await api.get(
        `/patients/search/name?name=${name}`
    );

    return response.data;

};

export const getPatientsPage = async (page, size) => {

    const response = await api.get(
        `/patients/page?page=${page}&size=${size}`
    );

    return response.data;

};

export const searchPatientByDisease = async (disease) => {

    const response = await api.get(
        `/patients/search/disease?disease=${disease}`
    );

    return response.data;

};