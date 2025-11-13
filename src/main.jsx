import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Empleado from "./components/Empleado";

// 🔹 Componente que protege rutas según rol
const ProtectedRoute = ({ component: Component, rolPermitido }) => {
  const rol = localStorage.getItem("rol"); // obtenemos el rol desde localStorage
  return rol === rolPermitido ? <Component /> : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={<ProtectedRoute component={Admin} rolPermitido="administrador" />}
        />
        <Route
          path="/empleado"
          element={<ProtectedRoute component={Empleado} rolPermitido="empleado" />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);