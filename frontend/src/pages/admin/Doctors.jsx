import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import Loader from "../../components/common/Loader";
import SearchBar from "../../components/common/SearchBar";

import AddDoctorModal from "../../components/doctor/AddDoctorModal";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { exportToExcel } from "../../utils/exportExcel";


import {
    getDoctorsPage,
    searchDoctors,
    deleteDoctor
} from "../../services/doctorService";

import Pagination from "../../components/common/Pagination";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);

    const [doctorToDelete, setDoctorToDelete] = useState(null);

    const pageSize = 5;

    useEffect(() => {

        loadDoctors(currentPage);

    }, [currentPage]);

    const loadDoctors = async (page) => {

        try {

            setLoading(true);

            const data = await getDoctorsPage(page, pageSize);

            setDoctors(data.content);

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

                loadDoctors(currentPage);

                return;

            }

            const data = await searchDoctors(value);

            setDoctors(data);

        } catch (error) {

            console.log(error);

        }

    };
    const handleDelete = async () => {

        try {

            await deleteDoctor(doctorToDelete);

            toast.success("Doctor Deleted Successfully");

            loadDoctors(currentPage);

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        } finally {

            setShowConfirm(false);

            setDoctorToDelete(null);

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

                <h2>Doctors</h2>

                <div>

                    <button
                        className="btn btn-success me-2"
                        onClick={() => exportToExcel(doctors, "Doctors")}
                    >
                        Export Excel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            setSelectedDoctor(null);

                            setShowModal(true);

                        }}
                    >
                        Add Doctor
                    </button>

                </div>



            </div>

            <div className="mb-4">

                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search Doctor..."
                />

            </div>

            <table className="table table-hover table-bordered">

                <thead className="table-dark">

                <tr>

                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    doctors.length > 0 ? (

                        doctors.map((doctor) => (

                            <tr key={doctor.id}>

                                <td>{doctor.doctorName}</td>

                                <td>{doctor.specialization}</td>

                                <td>{doctor.qualification}</td>

                                <td>{doctor.experience}</td>

                                <td>{doctor.phone}</td>

                                <td>{doctor.email}</td>

                                <td>₹ {doctor.consultationFee}</td>

                                <td>

                                        <span
                                            className={
                                                doctor.status
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }
                                        >
                                            {
                                                doctor.status
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                        </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {

                                            setSelectedDoctor(doctor);
                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {

                                            setDoctorToDelete(doctor.id);

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
                                colSpan="9"
                                className="text-center"
                            >
                                No Doctors Found
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

                title="Delete Doctor"

                message="Are you sure you want to delete this doctor?"

                onConfirm={handleDelete}

                onCancel={() => {

                    setShowConfirm(false);

                    setDoctorToDelete(null);

                }}

            />

            {

                showModal && (

                    <AddDoctorModal

                        doctorData={selectedDoctor}

                        onClose={() => {

                            setShowModal(false);
                            setSelectedDoctor(null);

                        }}

                        onSuccess={() => loadDoctors(currentPage)}

                    />

                )

            }

        </AdminLayout>


    );

}

export default Doctors;