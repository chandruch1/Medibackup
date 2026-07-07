import { useEffect, useState } from "react";

import { getDoctors } from "../../services/doctorService";
import { getPatients } from "../../services/patientService";
import {
    bookAppointment,
    updateAppointment
} from "../../services/appointmentService";
import { toast } from "react-toastify";

function BookAppointmentModal({

                                  appointmentData = null,
                                  onClose,
                                  onSuccess

                              }) {

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    const [appointment, setAppointment] = useState(

        appointmentData || {

            doctorId: "",
            patientId: "",
            appointmentDate: "",
            appointmentTime: "",
            reason: ""

        }

    );

    useEffect(() => {

        loadDoctors();

        loadPatients();

    }, []);

    const loadDoctors = async () => {

        const data = await getDoctors();

        setDoctors(data);

    };

    const loadPatients = async () => {

        const data = await getPatients();

        setPatients(data);

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAppointment({

            ...appointment,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (appointmentData) {

                await updateAppointment(
                    appointmentData.id,
                    appointment
                );

                toast.success("Appointment Updated Successfully");

            } else {

                await bookAppointment(
                    appointment
                );

                toast.error("Appointment Booked Successfully");

            }

            onSuccess();

            onClose();

        } catch (error) {

            console.log(error);

            toast.error("Operation Failed");

        }

    };

    return (

        <div className="modal d-block">

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h4>

                            {

                                appointmentData

                                    ? "Edit Appointment"

                                    : "Book Appointment"

                            }

                        </h4>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Patient</label>

                                    <select
                                        className="form-select"
                                        name="patientId"
                                        value={appointment.patientId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Patient
                                        </option>

                                        {

                                            patients.map(patient => (

                                                <option
                                                    key={patient.id}
                                                    value={patient.id}
                                                >
                                                    {patient.patientName}
                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Doctor</label>

                                    <select
                                        className="form-select"
                                        name="doctorId"
                                        value={appointment.doctorId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Doctor
                                        </option>

                                        {

                                            doctors.map(doctor => (

                                                <option
                                                    key={doctor.id}
                                                    value={doctor.id}
                                                >
                                                    {doctor.doctorName}
                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Appointment Date</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="appointmentDate"
                                        value={appointment.appointmentDate}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Appointment Time</label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        name="appointmentTime"
                                        value={appointment.appointmentTime}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Reason</label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="reason"
                                        value={appointment.reason}
                                        onChange={handleChange}
                                        required
                                    ></textarea>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                {

                                    appointmentData

                                        ? "Update"

                                        : "Book"

                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default BookAppointmentModal;