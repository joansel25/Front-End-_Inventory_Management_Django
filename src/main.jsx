import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register"; // ✅ nuevo
import Admin from "./components/Admin";
import Empleado from "./components/Empleado";
import Usuarios from "./components/Usuarios";
import Productos from "./components/Productos";
import Movimientos from "./components/Movimientos";
import RegistrarEntrada from "./components/RegistrarEntrada";
import RegistrarSalida from "./components/RegistrarSalida";
import AjustarStock from "./components/AjustarStock";
import RegistrarVenta from "./components/RegistrarVenta";
import SalidaRegistrar from "./components/SalidaRegistrar";

const ProtectedRoute = ({ component: Component, rolPermitido }) => {
  const rol = localStorage.getItem("rol");
  return rol === rolPermitido ? <Component /> : <Navigate to="/" />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Administrador */}
        <Route
          path="/admin"
          element={<ProtectedRoute component={Admin} rolPermitido="administrador" />}
        />
        <Route
          path="/usuarios"
          element={<ProtectedRoute component={Usuarios} rolPermitido="administrador" />}
        />
        <Route
          path="/productos"
          element={<ProtectedRoute component={Productos} rolPermitido="administrador" />}
        />
        <Route
          path="/movimientos"
          element={<ProtectedRoute component={Movimientos} rolPermitido="administrador" />}
        />
        <Route
          path="/registrar-entrada"
          element={<ProtectedRoute component={RegistrarEntrada} rolPermitido="administrador" />}
        />
        <Route
          path="/registrar-salida-admin"
          element={<ProtectedRoute component={RegistrarSalida} rolPermitido="administrador" />}
        />
        <Route
          path="/ajustar-stock"
          element={<ProtectedRoute component={AjustarStock} rolPermitido="administrador" />}
        />

        {/* Empleado */}
        <Route
          path="/empleado"
          element={<ProtectedRoute component={Empleado} rolPermitido="empleado" />}
        />
        <Route
          path="/registrar-venta"
          element={<ProtectedRoute component={RegistrarVenta} rolPermitido="empleado" />}
        />
        <Route
          path="/registrar-salida-empleado"
          element={<ProtectedRoute component={SalidaRegistrar} rolPermitido="empleado" />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);