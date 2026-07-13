import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserShield, FaUserMd, FaUser, FaLock, FaEnvelope, FaHospital, FaEye, FaEyeSlash } from "react-icons/fa";
import { login, loginDoctor, loginPatient } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const TABS = [
    { key: "ADMIN",   label: "Admin",   icon: <FaUserShield />,  color: "#0d6efd" },
    { key: "DOCTOR",  label: "Doctor",  icon: <FaUserMd />,      color: "#20c997" },
    { key: "PATIENT", label: "Patient", icon: <FaUser />,        color: "#6f42c1" },
];

function Login() {
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [activeTab, setActiveTab]     = useState("ADMIN");
    const [identifier, setIdentifier]   = useState("");  // username or email
    const [password, setPassword]       = useState("");
    const [showPass, setShowPass]       = useState(false);
    const [loading, setLoading]         = useState(false);
    const [error, setError]             = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (activeTab === "ADMIN") {
                const res = await login({ username: identifier, password });
                authLogin({ token: res.token, role: "ADMIN", username: identifier });
                toast.success("Welcome, Admin!");
                navigate("/admin/dashboard");

            } else if (activeTab === "DOCTOR") {
                const res = await loginDoctor({ email: identifier, password });
                authLogin({
                    token: res.token,
                    role: "DOCTOR",
                    username: res.doctorName,
                    userData: { email: res.email, specialization: res.specialization }
                });
                toast.success(`Welcome, Dr. ${res.doctorName}!`);
                navigate("/doctor/dashboard");

            } else {
                const res = await loginPatient({ email: identifier, password });
                authLogin({
                    token: res.token,
                    role: "PATIENT",
                    username: res.patientName,
                    userData: { email: res.email }
                });
                toast.success(`Welcome, ${res.patientName}!`);
                navigate("/patient/dashboard");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || "Login failed. Please check your credentials.";
            setError(typeof msg === "string" ? msg : "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    const activeColor = TABS.find(t => t.key === activeTab)?.color || "#0d6efd";
    const isEmail = activeTab !== "ADMIN";

    return (
        <div className="ms-login-page">
            {/* Left Panel */}
            <div className="ms-login-left">
                <div style={{ marginBottom: 48 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 14,
                            background: "linear-gradient(135deg, #0d6efd, #20c997)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 26, color: "#fff"
                        }}>
                            <FaHospital />
                        </div>
                        <div>
                            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>MediSphere</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>HEALTHCARE SYSTEM</div>
                        </div>
                    </div>
                    <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
                        Your Health,<br />
                        <span style={{ color: "#20c997" }}>Our Priority</span>
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, maxWidth: 380, lineHeight: 1.7 }}>
                        Connecting doctors, patients, and administrators in one seamless healthcare platform.
                    </p>
                </div>

                <div style={{ display: "flex", gap: 32 }}>
                    {["500+ Doctors", "10k+ Patients", "50k+ Appointments"].map(stat => (
                        <div key={stat}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: "#20c997" }}>{stat.split(" ")[0]}</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{stat.split(" ").slice(1).join(" ")}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel */}
            <div className="ms-login-right">
                <div className="ms-login-card">
                    {/* Header */}
                    <div style={{ textAlign: "center", marginBottom: 28 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Sign In</h2>
                        <p style={{ color: "var(--gray-500)", fontSize: 14 }}>Access your MediSphere portal</p>
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: "flex", background: "var(--gray-100)",
                        borderRadius: 10, padding: 4, marginBottom: 28
                    }}>
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => { setActiveTab(tab.key); setError(""); setIdentifier(""); setPassword(""); }}
                                style={{
                                    flex: 1, padding: "9px 4px", border: "none", cursor: "pointer",
                                    borderRadius: 8, fontSize: 13, fontWeight: 600,
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                    transition: "all 0.2s",
                                    background: activeTab === tab.key ? "#fff" : "transparent",
                                    color: activeTab === tab.key ? tab.color : "var(--gray-500)",
                                    boxShadow: activeTab === tab.key ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: "rgba(220,53,69,0.08)", border: "1px solid rgba(220,53,69,0.2)",
                            borderRadius: 8, padding: "10px 14px", marginBottom: 16,
                            color: "#dc3545", fontSize: 13
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        {/* Identifier */}
                        <div className="ms-form-group">
                            <label className="ms-form-label">
                                {isEmail ? "Email Address" : "Username"}
                            </label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                                    color: "var(--gray-400)", fontSize: 15
                                }}>
                                    {isEmail ? <FaEnvelope /> : <FaUser />}
                                </span>
                                <input
                                    type={isEmail ? "email" : "text"}
                                    className="ms-form-control"
                                    style={{ paddingLeft: 38 }}
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder={isEmail ? "doctor@hospital.com" : "admin"}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="ms-form-group">
                            <label className="ms-form-label">Password</label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                                    color: "var(--gray-400)", fontSize: 15
                                }}>
                                    <FaLock />
                                </span>
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="ms-form-control"
                                    style={{ paddingLeft: 38, paddingRight: 40 }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    style={{
                                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                        background: "none", border: "none", cursor: "pointer",
                                        color: "var(--gray-400)", fontSize: 15
                                    }}
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password — only for patients */}
                        {activeTab === "PATIENT" && (
                            <div style={{ textAlign: "right", marginTop: -10, marginBottom: 16 }}>
                                <Link to="/forgot-password" style={{ fontSize: 13, color: activeColor }}>
                                    Forgot Password?
                                </Link>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="ms-btn ms-btn-primary w-100"
                            disabled={loading}
                            style={{
                                justifyContent: "center",
                                background: `linear-gradient(135deg, ${activeColor}, ${activeColor}cc)`,
                                boxShadow: `0 4px 12px ${activeColor}40`
                            }}
                        >
                            {loading ? "Signing in..." : `Sign in as ${activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}`}
                        </button>
                    </form>

                    {/* Register Link */}
                    {activeTab === "PATIENT" && (
                        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--gray-500)" }}>
                            New patient?{" "}
                            <Link to="/register" style={{ color: activeColor, fontWeight: 600 }}>
                                Create an account
                            </Link>
                        </p>
                    )}

                    <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "var(--gray-400)" }}>
                        <Link to="/" style={{ color: "var(--gray-400)" }}>← Back to Home</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;