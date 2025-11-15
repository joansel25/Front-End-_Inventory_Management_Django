// main.jsx - VERSIÓN COMPLETAMENTE CORREGIDA
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import EmpleadoDashboard from "./components/EmpleadoDashboard";
import RegistrarSalida from "./components/RegistrarSalida";
import ConsultarProductos from "./components/ConsultarProducto";
import MisVentas from "./components/MisVentas";
import Productos from "./components/Productos";
import Movimientos from "./components/Movimientos";
import ClienteDashboard from "./components/ClienteDashboard";
import MisCompras from "./components/MisCompras";
import PerfilCliente from "./components/PerfilCliente";
import Usuarios from "./components/Usuarios";
import Reportes from "./components/Reporte";
import RegistrarVenta from "./components/RegistrarVenta";

// PrivateRoute corregido
import PrivateRoute from "./router/PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* === ADMINISTRADOR === */}
        <Route
          path="/admin"
          element={
            <PrivateRoute rolPermitido="administrador">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute rolPermitido="administrador">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute rolPermitido="administrador">
              <Usuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <PrivateRoute rolPermitido="administrador">
              <Reportes />
            </PrivateRoute>
          }
        />

        {/* === EMPLEADO === */}
        <Route
          path="/empleado"
          element={
            <PrivateRoute rolPermitido="empleado">
              <EmpleadoDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado/dashboard"
          element={
            <PrivateRoute rolPermitido="empleado">
              <EmpleadoDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado/registrar-venta"
          element={
            <PrivateRoute rolPermitido="empleado">
              <RegistrarVenta />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado/registrar-salida"
          element={
            <PrivateRoute rolPermitido="empleado">
              <RegistrarSalida />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado/productos"
          element={
            <PrivateRoute rolPermitido="empleado">
              <ConsultarProductos />
            </PrivateRoute>
          }
        />
        <Route
          path="/empleado/mis-ventas"
          element={
            <PrivateRoute rolPermitido="empleado">
              <MisVentas />
            </PrivateRoute>
          }
        />

        {/* === CLIENTE === */}
        <Route
          path="/cliente"
          element={
            <PrivateRoute rolPermitido="cliente">
              <ClienteDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/dashboard"
          element={
            <PrivateRoute rolPermitido="cliente">
              <ClienteDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/mis-compras"
          element={
            <PrivateRoute rolPermitido="cliente">
              <MisCompras />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/perfil"
          element={
            <PrivateRoute rolPermitido="cliente">
              <PerfilCliente />
            </PrivateRoute>
          }
        />

        {/* === RUTAS COMPARTIDAS === */}
        <Route
          path="/movimientos"
          element={
            <PrivateRoute rolPermitido={["administrador", "empleado"]}>
              <Movimientos />
            </PrivateRoute>
          }
        />
        <Route
          path="/productos"
          element={
            <PrivateRoute rolPermitido={["administrador", "empleado"]}>
              <Productos />
            </PrivateRoute>
          }
        />

        {/* Ruta por defecto para páginas no encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);