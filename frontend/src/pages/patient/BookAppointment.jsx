import { useEffect, useState } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import Loader from "../../components/common/Loader";
import { toast } from "react-toastify";
import { FaCalendarPlus, FaUserMd, FaStar } from "react-icons/fa";
import { getAvailableDoctors } from "../../services/doctorService";
import { bookAppointmentPatient } from "../../services/appointmentService";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
    const navigate = useNavigate();
    const [doctors, setDoctors]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({
        doctorId: "", appointmentDate: "", appointmentTime: "", reason: ""
    });

    useEffect(() => {
        getAvailableDoctors()
            .then(setDoctors)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleSelectDoctor = (doc) => {
        setSelected(doc);
        setForm(f => ({ ...f, doctorId: doc.id }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.doctorId) { toast.error("Please select a doctor."); return; }
        setSubmitting(true);
        try {
            await bookAppointmentPatient(form);
            toast.success("Appointment booked successfully! Confirmation sent to your email.");
            navigate("/patient/appointments");
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || "Booking failed.";
            toast.error(typeof msg === "string" ? msg : "Booking failed.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PatientLayout title="Book Appointment" subtitle="Choose a doctor and schedule your visit">
            <div className="row g-4">
                {/* Left: Doctor Selection */}
                <div className="col-lg-7">
                    <div className="ms-card">
                        <div className="ms-card-header">
                            <FaUserMd /> Select a Doctor
                        </div>
                        {loading ? <Loader text="Loading doctors..." /> : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {doctors.length === 0 ? (
                                    <p style={{ color: "var(--gray-400)", textAlign: "center", padding: "24px 0" }}>
                                        No doctors available at the moment.
                                    </p>
                                ) : doctors.map(doc => (
                                    <div key={doc.id}
                                        onClick={() => handleSelectDoctor(doc)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 14,
                                            padding: 16, borderRadius: 12, cursor: "pointer",
                                            border: `2px solid ${selected?.id === doc.id ? "#0d6efd" : "var(--border-color)"}`,
                                            background: selected?.id === doc.id ? "var(--primary-light)" : "#fff",
                                            transition: "all 0.2s"
                                        }}
                                    >
                                        {/* Avatar */}
                                        <div style={{
                                            width: 52, height: 52, borderRadius: 12,
                                            background: "linear-gradient(135deg, #0d6efd, #20c997)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#fff", fontWeight: 700, fontSize: 20, flexShrink: 0
                                        }}>
                                            {doc.doctorName?.[0] || "D"}
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: 15 }}>Dr. {doc.doctorName}</div>
                                            <div style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>
                                                {doc.specialization} • {doc.qualification} • {doc.experience} yrs exp.
                                            </div>
                                            <div style={{ fontSize: 11, color: "#198754", marginTop: 4, fontWeight: 600 }}>
                                                📅 {doc.availableDays} | 🕒 {doc.availableTime}
                                            </div>
                                        </div>

                                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                                            <div style={{ fontWeight: 700, color: "#0d6efd", fontSize: 15 }}>
                                                ₹ {doc.consultationFee}
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 3, justifyContent: "flex-end" }}>
                                                <FaStar style={{ color: "#ffc107", fontSize: 11 }} />
                                                <span style={{ fontSize: 12, color: "var(--gray-500)" }}>4.8</span>
                                            </div>
                                        </div>

                                        {selected?.id === doc.id && (
                                            <div style={{ width: 20, height: 20, borderRadius: "50%",
                                                background: "#0d6efd", color: "#fff",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                                                ✓
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Booking Form */}
                <div className="col-lg-5">
                    <div className="ms-card" style={{ position: "sticky", top: 80 }}>
                        <div className="ms-card-header">
                            <FaCalendarPlus /> Appointment Details
                        </div>

                        {selected ? (
                            <div style={{
                                background: "var(--primary-light)", borderRadius: 8, padding: "10px 14px",
                                marginBottom: 16, fontSize: 13
                            }}>
                                <span style={{ fontWeight: 600, color: "#0d6efd" }}>Dr. {selected.doctorName}</span>
                                <span style={{ color: "var(--gray-500)", marginLeft: 6 }}>— {selected.specialization}</span>
                            </div>
                        ) : (
                            <div style={{
                                background: "var(--gray-100)", borderRadius: 8, padding: "10px 14px",
                                marginBottom: 16, fontSize: 13, color: "var(--gray-400)"
                            }}>
                                Please select a doctor first
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="ms-form-group">
                                <label className="ms-form-label">Appointment Date</label>
                                <input type="date" className="ms-form-control"
                                    value={form.appointmentDate}
                                    onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                                    min={new Date().toISOString().split("T")[0]}
                                    required />
                            </div>
                            <div className="ms-form-group">
                                <label className="ms-form-label">Preferred Time</label>
                                <input type="time" className="ms-form-control"
                                    value={form.appointmentTime}
                                    onChange={e => setForm({ ...form, appointmentTime: e.target.value })}
                                    required />
                            </div>
                            <div className="ms-form-group">
                                <label className="ms-form-label">Reason for Visit</label>
                                <textarea className="ms-form-control" rows={4}
                                    value={form.reason}
                                    onChange={e => setForm({ ...form, reason: e.target.value })}
                                    placeholder="Describe your symptoms or reason for the appointment..."
                                    style={{ resize: "none" }} required />
                            </div>
                            <button type="submit" className="ms-btn ms-btn-primary w-100"
                                style={{ justifyContent: "center" }} disabled={submitting || !selected}>
                                <FaCalendarPlus />
                                {submitting ? "Booking..." : "Confirm Appointment"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}

export default BookAppointment;
