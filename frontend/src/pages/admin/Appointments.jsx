import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import Loader from "../../components/common/Loader";
import SearchBar from "../../components/common/SearchBar";
import { toast } from "react-toastify";

import BookAppointmentModal from "../../components/appointment/BookAppointmentModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
    getAppointmentsPage,
    deleteAppointment,
    completeAppointment,
    cancelAppointment,
    searchAppointmentByPatient,
    searchAppointmentByDoctor,
    searchAppointmentByDate
} from "../../services/appointmentService";

import Pagination from "../../components/common/Pagination";

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [showConfirm, setShowConfirm] = useState(false);

    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const pageSize = 5;

    useEffect(() => {

        loadAppointments(currentPage);

    }, [currentPage]);

    const loadAppointments = async (page) => {

        try {

            setLoading(true);

            const data = await getAppointmentsPage(page, pageSize);

            setAppointments(data.content);

            setTotalPages(data.totalPages);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async (value) => {

        setSearch(value);

        try {

            if (value.trim() === "") {

                loadAppointments(currentPage);

                return;

            }

            const data = await searchAppointmentByPatient(value);

            setAppointments(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteAppointment(appointmentToDelete);

            toast.success("Appointment Deleted Successfully");

            loadAppointments(currentPage);

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        } finally {

            setShowConfirm(false);

            setAppointmentToDelete(null);

        }

    };
    const handleComplete = async (id) => {

        try {

            await completeAppointment(id);

            toast.success("Appointment Completed");

            loadAppointments(currentPage);

        } catch (error) {

            console.log(error);

            toast.error("Failed to Complete Appointment");

        }

    };

    const handleCancel = async (id) => {

        try {

            await cancelAppointment(id);

            toast.success("Appointment Cancelled");

            loadAppointments(currentPage);

        } catch (error) {

            console.log(error);

            toast.error("Failed to Cancel Appointment");

        }

    };

    if (loading) {

        return (

            <AdminLayout>

                <Loader />

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Appointments</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedAppointment(null);
                        setShowModal(true);

                    }}
                >
                    Book Appointment
                </button>

            </div>

            <div className="mb-4">

                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search Patient..."
                />

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                <tr>

                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    appointments.length > 0 ? (

                        appointments.map((appointment) => (

                            <tr key={appointment.id}>

                                <td>{appointment.patientName}</td>

                                <td>{appointment.doctorName}</td>

                                <td>{appointment.appointmentDate}</td>

                                <td>{appointment.appointmentTime}</td>

                                <td>{appointment.reason}</td>

                                <td>

                                    <span
                                         className={`badge ${
                                          appointment.status === "BOOKED"
                                            ? "bg-primary"
                                            : appointment.status === "COMPLETED"
                                            ? "bg-success"
                                            : "bg-danger"
                                             }`}
                                            >
                                         {appointment.status}
                                    </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-1"
                                        onClick={() => {

                                            setSelectedAppointment(appointment);

                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-success btn-sm me-1"
                                        disabled={appointment.status === "COMPLETED"}
                                        onClick={() => handleComplete(appointment.id)}
                                    >
                                        Complete
                                    </button>

                                    <button
                                        className="btn btn-secondary btn-sm me-1"
                                        disabled={appointment.status === "CANCELLED"}
                                        onClick={() => handleCancel(appointment.id)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {

                                            setAppointmentToDelete(appointment.id);

                                            setShowConfirm(true);

                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center"
                            >

                                No Appointments Found

                            </td>

                        </tr>

                    )

                }

                </tbody>

            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={() => setCurrentPage(currentPage - 1)}
                onNext={() => setCurrentPage(currentPage + 1)}
            />

            <ConfirmDialog

                show={showConfirm}

                title="Delete Appointment"

                message="Are you sure you want to delete this appointment?"

                onConfirm={handleDelete}

                onCancel={() => {

                    setShowConfirm(false);

                    setAppointmentToDelete(null);

                }}

            />

            {

                showModal && (

                    <BookAppointmentModal

                        appointmentData={selectedAppointment}

                        onClose={() => {

                            setShowModal(false);

                            setSelectedAppointment(null);

                        }}

                        onSuccess={() => loadAppointments(currentPage)}

                    />

                )

            }

        </AdminLayout>

    );

}

export default Appointments;