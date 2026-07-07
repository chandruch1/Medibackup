import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import Loader from "../../components/common/Loader";
import SearchBar from "../../components/common/SearchBar";

import AddPatientModal from "../../components/patient/AddPatientModal";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
    getPatientsPage,
    searchPatientByName,
    deletePatient
} from "../../services/patientService";

import Pagination from "../../components/common/Pagination";

function Patients() {

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [showConfirm, setShowConfirm] = useState(false);

    const [patientToDelete, setPatientToDelete] = useState(null);

    const pageSize = 5;

    useEffect(() => {

        loadPatients(currentPage);

    }, [currentPage]);

    const loadPatients = async (page) => {

        try {

            setLoading(true);

            const data = await getPatientsPage(page, pageSize);

            setPatients(data.content);

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

                loadPatients(currentPage);

                return;

            }

            const data = await searchPatientByName(value);

            setPatients(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async () => {

        try {

            await deletePatient(patientToDelete);

            toast.success("Patient Deleted Successfully");

            loadPatients(currentPage);

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        } finally {

            setShowConfirm(false);

            setPatientToDelete(null);

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

                <h2>Patients</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setSelectedPatient(null);

                        setShowModal(true);

                    }}
                >
                    Add Patient
                </button>

            </div>

            <div className="mb-4">

                <SearchBar
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search Patient..."
                />

            </div>

            <table className="table table-hover table-bordered">

                <thead className="table-dark">

                <tr>

                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Blood Group</th>
                    <th>Disease</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    patients.length > 0 ? (

                        patients.map((patient) => (

                            <tr key={patient.id}>

                                <td>{patient.patientName}</td>

                                <td>{patient.age}</td>

                                <td>{patient.gender}</td>

                                <td>{patient.phone}</td>

                                <td>{patient.bloodGroup}</td>

                                <td>{patient.disease}</td>

                                <td>

                                        <span
                                            className={
                                                patient.status
                                                    ? "badge bg-success"
                                                    : "badge bg-danger"
                                            }
                                        >
                                            {
                                                patient.status
                                                    ? "Active"
                                                    : "Inactive"
                                            }
                                        </span>

                                </td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => {

                                            setSelectedPatient(patient);

                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => {

                                            setPatientToDelete(patient.id);

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

                            <td colSpan="8" className="text-center">

                                No Patients Found

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

                title="Delete Patient"

                message="Are you sure you want to delete this patient?"

                onConfirm={handleDelete}

                onCancel={() => {

                    setShowConfirm(false);

                    setPatientToDelete(null);

                }}

            />
            {

                showModal && (

                    <AddPatientModal

                        patientData={selectedPatient}

                        onClose={() => {

                            setShowModal(false);

                            setSelectedPatient(null);

                        }}

                        onSuccess={() => loadPatients(currentPage)}

                    />

                )

            }

        </AdminLayout>

    );

}

export default Patients;