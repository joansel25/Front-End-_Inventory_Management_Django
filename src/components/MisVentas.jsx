// components/MisVentas.jsx - VERSIÓN SIMPLIFICADA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, ShoppingCart, Download } from "lucide-react";

export default function MisVentas() {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        // Cargar todas las ventas (por ahora, después filtrar por empleado)
        const response = await api.get("/farmacia/facturasventa/");
        console.log("📦 Ventas cargadas:", response.data);
        setVentas(response.data.slice(0, 10)); // Mostrar solo las primeras 10
      } catch (error) {
        console.error("❌ Error cargando ventas:", error);
        alert("Error al cargar las ventas");
      } finally {
        setLoading(false);
      }
    };

    cargarVentas();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" 
           style={{ background: "linear-gradient(135deg, #d0f0c0, #b2dfdb)" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #d0f0c0, #b2dfdb)" }}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button
            onClick={() => navigate("/empleado")}
            className="btn btn-outline-primary"
          >
            <ArrowLeft size={18} /> Volver al Dashboard
          </button>
          <h1 className="text-primary d-flex align-items-center">
            <ShoppingCart className="me-2" /> Mis Ventas
          </h1>
        </div>

        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white py-3">
            <h4 className="mb-0">Historial de Ventas</h4>
          </div>
          <div className="card-body">
            {ventas.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={64} className="text-muted mb-3" />
                <h5 className="text-muted">No hay ventas registradas</h5>
                <p className="text-muted">Las ventas que registres aparecerán aquí</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>ID Factura</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ventas.map((venta) => (
                      <tr key={venta.id}>
                        <td className="fw-bold">#{venta.id}</td>
                        <td>{new Date(venta.fecha).toLocaleDateString('es-ES')}</td>
                        <td>{venta.id_cliente?.nombre || "Cliente general"}</td>
                        <td className="fw-bold text-success">
                          ${parseFloat(venta.total || 0).toFixed(2)}
                        </td>
                        <td>
                          <span className="badge bg-success">Completada</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}