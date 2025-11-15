// src/pages/empleado/ConsultarProductos.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft, Download, Search } from "lucide-react";
import api from "../services/api";

export default function ConsultarProductos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await api.get("/farmacia/productos/");
        setProductos(response.data);
      } catch (error) {
        console.error("Error cargando productos:", error);
        alert("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  const descargarPDF = async () => {
    try {
      const response = await api.get("/farmacia/productos/all_pdf/", {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventario_productos.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar PDF:", error);
      alert("Error al descargar el PDF");
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.id_categoria?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <button onClick={() => navigate("/empleado/dashboard")} className="btn btn-outline-primary">
            <ArrowLeft size={18} /> Volver al Dashboard
          </button>
          <div className="d-flex gap-2">
            <div className="input-group" style={{width: "300px"}}>
              <span className="input-group-text bg-light">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={descargarPDF} className="btn btn-outline-primary">
              <Download size={18} /> Descargar PDF
            </button>
          </div>
        </div>

        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <Package className="me-2" /> Inventario de Productos
              <span className="badge bg-light text-primary ms-2">
                {productosFiltrados.length} productos
              </span>
            </h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Proveedor</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((producto) => (
                    <tr key={producto.id}>
                      <td className="fw-bold">{producto.nombre}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {producto.id_categoria?.nombre || "N/A"}
                        </span>
                      </td>
                      <td className="fw-bold text-success">
                        ${parseFloat(producto.precio).toFixed(2)}
                      </td>
                      <td>
                        <span className={producto.stock < 10 ? "text-danger fw-bold" : "text-success fw-bold"}>
                          {producto.stock} unidades
                        </span>
                      </td>
                      <td>{producto.id_proveedor?.nombre || "N/A"}</td>
                      <td>
                        {producto.stock === 0 ? (
                          <span className="badge bg-danger">Sin Stock</span>
                        ) : producto.stock < 10 ? (
                          <span className="badge bg-warning">Stock Bajo</span>
                        ) : (
                          <span className="badge bg-success">Disponible</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {productosFiltrados.length === 0 && (
              <div className="text-center py-5">
                <Package size={64} className="text-muted mb-3" />
                <h5 className="text-muted">No se encontraron productos</h5>
                <p className="text-muted">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}