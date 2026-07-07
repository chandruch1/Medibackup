import { useState } from "react";

import {
    addPatient,
    updatePatient
} from "../../services/patientService";
import { toast } from "react-toastify";

function AddPatientModal({

                             patientData = null,
                             onClose,
                             onSuccess

                         }) {

    const [patient, setPatient] = useState(

        patientData || {

            patientName: "",
            age: "",
            gender: "Male",
            phone: "",
            email: "",
            address: "",
            bloodGroup: "O+",
            disease: "",
            status: true

        }

    );

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPatient({

            ...patient,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (patientData) {

                await updatePatient(
                    patient.id,
                    patient
                );

                toast.success("Patient Updated Successfully");

            } else {

                await addPatient(patient);

                toast.success("Patient Added Successfully");

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

                                patientData

                                    ? "Edit Patient"

                                    : "Add Patient"

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

                                    <label>Patient Name</label>

                                    <input
                                        className="form-control"
                                        name="patientName"
                                        value={patient.patientName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label>Age</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="age"
                                        value={patient.age}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-3 mb-3">

                                    <label>Gender</label>

                                    <select
                                        className="form-select"
                                        name="gender"
                                        value={patient.gender}
                                        onChange={handleChange}
                                    >

                                        <option>Male</option>

                                        <option>Female</option>

                                        <option>Other</option>

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone</label>

                                    <input
                                        className="form-control"
                                        name="phone"
                                        value={patient.phone}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={patient.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Address</label>

                                    <textarea
                                        className="form-control"
                                        name="address"
                                        value={patient.address}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Blood Group</label>

                                    <select
                                        className="form-select"
                                        name="bloodGroup"
                                        value={patient.bloodGroup}
                                        onChange={handleChange}
                                    >

                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                        <option>O+</option>
                                        <option>O-</option>

                                    </select>

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Disease</label>

                                    <input
                                        className="form-control"
                                        name="disease"
                                        value={patient.disease}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>
                                <div className="col-md-6 mb-3">

                                    <label>Status</label>

                                    <select
                                        className="form-select"
                                        name="status"
                                        value={patient.status}
                                        onChange={(e) =>
                                            setPatient({
                                                ...patient,
                                                status: e.target.value === "true"
                                            })
                                        }
                                    >

                                        <option value="true">Active</option>

                                        <option value="false">Inactive</option>

                                    </select>

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
                                Save
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddPatientModal;