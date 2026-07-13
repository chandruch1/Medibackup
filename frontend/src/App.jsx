import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Public
import Landing          from "./pages/Landing";
import Login            from "./pages/auth/Login";
import Register         from "./pages/auth/Register";
import ForgotPassword   from "./pages/auth/ForgotPassword";
import VerifyOtp        from "./pages/auth/VerifyOtp";
import ResetPassword    from "./pages/auth/ResetPassword";

// Admin
import AdminDashboard   from "./pages/admin/Dashboard";
import AdminDoctors     from "./pages/admin/Doctors";
import AdminPatients    from "./pages/admin/Patients";
import AdminAppointments from "./pages/admin/Appointments";
import AdminProfile     from "./pages/admin/Profile";

// Doctor
import DoctorDashboard  from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/MyAppointments";
import DoctorPrescriptions from "./pages/doctor/Prescriptions";
import DoctorProfile    from "./pages/doctor/Profile";

// Patient
import PatientDashboard from "./pages/patient/Dashboard";
import BookAppointment  from "./pages/patient/BookAppointment";
import PatientAppointments from "./pages/patient/MyAppointments";
import PatientProfile   from "./pages/patient/Profile";
import ChangePassword   from "./pages/patient/ChangePassword";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ── Public ─────────────────────────────────────────── */}
                    <Route path="/"                element={<Landing />} />
                    <Route path="/login"           element={<Login />} />
                    <Route path="/register"        element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-otp"      element={<VerifyOtp />} />
                    <Route path="/reset-password"  element={<ResetPassword />} />

                    {/* ── Admin ──────────────────────────────────────────── */}
                    <Route path="/admin/dashboard"    element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/admin/doctors"      element={<ProtectedRoute role="ADMIN"><AdminDoctors /></ProtectedRoute>} />
                    <Route path="/admin/patients"     element={<ProtectedRoute role="ADMIN"><AdminPatients /></ProtectedRoute>} />
                    <Route path="/admin/appointments" element={<ProtectedRoute role="ADMIN"><AdminAppointments /></ProtectedRoute>} />
                    <Route path="/admin/profile"      element={<ProtectedRoute role="ADMIN"><AdminProfile /></ProtectedRoute>} />

                    {/* ── Doctor ─────────────────────────────────────────── */}
                    <Route path="/doctor/dashboard"     element={<ProtectedRoute role="DOCTOR"><DoctorDashboard /></ProtectedRoute>} />
                    <Route path="/doctor/appointments"  element={<ProtectedRoute role="DOCTOR"><DoctorAppointments /></ProtectedRoute>} />
                    <Route path="/doctor/prescriptions" element={<ProtectedRoute role="DOCTOR"><DoctorPrescriptions /></ProtectedRoute>} />
                    <Route path="/doctor/profile"       element={<ProtectedRoute role="DOCTOR"><DoctorProfile /></ProtectedRoute>} />

                    {/* ── Patient ────────────────────────────────────────── */}
                    <Route path="/patient/dashboard"        element={<ProtectedRoute role="PATIENT"><PatientDashboard /></ProtectedRoute>} />
                    <Route path="/patient/book"             element={<ProtectedRoute role="PATIENT"><BookAppointment /></ProtectedRoute>} />
                    <Route path="/patient/appointments"     element={<ProtectedRoute role="PATIENT"><PatientAppointments /></ProtectedRoute>} />
                    <Route path="/patient/profile"          element={<ProtectedRoute role="PATIENT"><PatientProfile /></ProtectedRoute>} />
                    <Route path="/patient/change-password"  element={<ProtectedRoute role="PATIENT"><ChangePassword /></ProtectedRoute>} />

                    {/* ── Fallback ────────────────────────────────────────── */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                toastStyle={{ borderRadius: 12, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            />
        </AuthProvider>
    );
}

export default App;