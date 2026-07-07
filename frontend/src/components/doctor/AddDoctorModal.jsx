import { useState } from "react";
import {
    addDoctor,
    updateDoctor
} from "../../services/doctorService";
import { toast } from "react-toastify";
function AddDoctorModal({
                            onClose,
                            onSuccess,
                            doctorData = null
                        }) {

    const [doctor, setDoctor] = useState(

        doctorData || {

            doctorName: "",
            specialization: "",
            qualification: "",
            experience: "",
            phone: "",
            email: "",
            consultationFee: "",
            availableDays: "",
            availableTime: "",
            status: true

        }

    );

    const handleChange = (e) => {

        const { name, value } = e.target;

        setDoctor({
            ...doctor,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (doctorData) {

                await updateDoctor(
                    doctor.id,
                    doctor
                );

                toast.success("Doctor Updated Successfully");

            } else {

                await addDoctor(
                    doctor
                );

                toast.success("Doctor Added Successfully");

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

                        <h4>Add Doctor</h4>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="doctorName"
                                        value={doctor.doctorName}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Specialization</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="specialization"
                                        value={doctor.specialization}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Qualification</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="qualification"
                                        value={doctor.qualification}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Experience</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="experience"
                                        value={doctor.experience}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={doctor.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={doctor.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Consultation Fee</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="consultationFee"
                                        value={doctor.consultationFee}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Available Days</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="availableDays"
                                        value={doctor.availableDays}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Available Time</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="availableTime"
                                        value={doctor.availableTime}
                                        onChange={handleChange}
                                    />

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

export default AddDoctorModal;