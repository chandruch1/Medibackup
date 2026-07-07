import api from "../api/api";

export const getDoctors = async () => {

    const response = await api.get("/doctors");

    return response.data;
};
export const searchDoctors = async (name) => {

    if (!name.trim()) {

        return getDoctors();

    }

    const response = await api.get(
        `/doctors/search/name?name=${name}`
    );

    return response.data;

};
export const getDoctorsPage = async (page, size) => {

    const response = await api.get(

        `/doctors/page?page=${page}&size=${size}`

    );

    return response.data;

};

export const addDoctor = async (doctor) => {

    const response = await api.post("/doctors", doctor);

    return response.data;

};
export const updateDoctor = async (id, doctor) => {

    const response = await api.put(`/doctors/${id}`, doctor);

    return response.data;
};
export const deleteDoctor = async (id) => {

    const response = await api.delete(`/doctors/${id}`);

    return response.data;

};
