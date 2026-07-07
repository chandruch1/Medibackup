import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import Doctors from "./pages/admin/Doctors";
import Patients from "./pages/admin/Patients";
import Appointments from "./pages/admin/Appointments";

import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/doctors"
                    element={
                        <ProtectedRoute>
                            <Doctors />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/patients"
                    element={
                        <ProtectedRoute>
                            <Patients />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/appointments"
                    element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;