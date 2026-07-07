import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import { saveToken, saveUsername } from "../../utils/token";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await login({
                username,
                password
            });

            console.log("Login Response:", response);

            saveToken(response.token);
            saveUsername(username);

            toast.success(response.message);

            // For now only ADMIN exists
            navigate("/admin/dashboard");

        } catch (err) {

            console.error("Login Error:", err);

            if (err.response) {

                console.log("Backend Response:", err.response.data);

                setError(
                    err.response.data.message || "Login Failed"
                );

            } else {

                toast.error("Cannot connect to the server.");

            }

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">
                                MediSphere Login
                            </h3>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;