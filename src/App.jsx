import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import EmpleadoDashboard from "./EmpleadoDashboard";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/admin"
          element={
            <PrivateRoute rolPermitido="Administrador">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado"
          element={
            <PrivateRoute rolPermitido="Empleado">
              <EmpleadoDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;