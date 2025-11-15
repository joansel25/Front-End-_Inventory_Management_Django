// src/components/Movimientos.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Filter,
  Package,
  User,
  Truck,
  Calendar
} from "lucide-react";
import api from "../services/api";
export default function Movimientos() {
  const navigate = useNavigate();
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState("");

  useEffect(() => {
    const cargarMovimientos = async () => {
      try {
        const response = await api.get("/farmacia/movimientos/");
        setMovimientos(response.data);
      } catch (error) {
        console.error("Error cargando movimientos:", error);
        alert("Error al cargar movimientos");
      } finally {
        setLoading(false);
      }
    };

    cargarMovimientos();
  }, []);

  const descargarPDF = async (movimientoId = null) => {
    try {
      let url;
      if (movimientoId) {
        url = `/farmacia/movimientos/${movimientoId}/pdf/`;
      } else {
        url = "/farmacia/movimientos/all_pdf/";
      }

      const response = await api.get(url, {
        responseType: "blob"
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlWindow = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = urlWindow;
      link.setAttribute("download", movimientoId ? `movimiento_${movimientoId}.pdf` : "todos_movimientos.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlWindow);
    } catch (error) {
      console.error("Error al descargar PDF:", error);
      alert("Error al descargar el PDF");
    }
  };

  // Filtrar movimientos
  const movimientosFiltrados = movimientos.filter(movimiento => {
    const matchesSearch = 
      movimiento.producto_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movimiento.proveedor_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movimiento.cliente_nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = !filterTipo || movimiento.tipo === filterTipo;
    
    return matchesSearch && matchesTipo;
  });

  const getBadgeVariant = (tipo) => {
    return tipo === 'entrada' ? 'success' : 'primary';
  };

  const getIcon = (tipo) => {
    return tipo === 'entrada' ? <Truck size={16} /> : <Package size={16} />;
  };

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
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-outline-primary"
          >
            <ArrowLeft size={18} /> Volver
          </button>
          <h1 className="text-primary d-flex align-items-center">
            <Package className="me-2" /> Movimientos de Inventario
          </h1>
          <button 
            onClick={() => descargarPDF()} 
            className="btn btn-outline-primary"
          >
            <Download size={18} /> Descargar PDF
          </button>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por producto, proveedor o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Filter size={16} />
                  </span>
                  <select
                    className="form-select"
                    value={filterTipo}
                    onChange={(e) => setFilterTipo(e.target.value)}
                  >
                    <option value="">Todos los tipos</option>
                    <option value="entrada">Entradas</option>
                    <option value="salida">Salidas</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <div className="text-muted text-center">
                  <small>Total: {movimientosFiltrados.length}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Movimientos */}
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <Package className="me-2" /> Lista de Movimientos
              <span className="badge bg-light text-primary ms-2">
                {movimientosFiltrados.length} registros
              </span>
            </h4>
          </div>
          <div className="card-body">
            {movimientosFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <Package size={64} className="text-muted mb-3" />
                <h5 className="text-muted">No se encontraron movimientos</h5>
                <p className="text-muted">No hay movimientos que coincidan con los filtros</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Tipo</th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Proveedor/Cliente</th>
                      <th>Responsable</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimientosFiltrados.map((movimiento) => (
                      <tr key={movimiento.id}>
                        <td className="fw-bold">#{movimiento.id}</td>
                        <td>
                          <span className={`badge bg-${getBadgeVariant(movimiento.tipo)} d-flex align-items-center`}>
                            {getIcon(movimiento.tipo)}
                            <span className="ms-1 text-capitalize">
                              {movimiento.tipo}
                            </span>
                          </span>
                        </td>
                        <td className="fw-bold">{movimiento.producto_nombre || "N/A"}</td>
                        <td>
                          <span className={`fw-bold ${movimiento.tipo === 'entrada' ? 'text-success' : 'text-danger'}`}>
                            {movimiento.tipo === 'entrada' ? '+' : '-'}{movimiento.cantidad}
                          </span>
                        </td>
                        <td>
                          {movimiento.tipo === 'entrada' ? (
                            <span className="text-success">
                              <Truck size={14} className="me-1" />
                              {movimiento.proveedor_nombre || "N/A"}
                            </span>
                          ) : (
                            <span className="text-primary">
                              <User size={14} className="me-1" />
                              {movimiento.cliente_nombre || "N/A"}
                            </span>
                          )}
                        </td>
                        <td>{movimiento.responsable_nombre || "N/A"}</td>
                        <td>
                          <small className="text-muted d-flex align-items-center">
                            <Calendar size={12} className="me-1" />
                            {new Date(movimiento.fecha).toLocaleDateString('es-ES')}
                          </small>
                        </td>
                        <td>
                          <button
                            onClick={() => descargarPDF(movimiento.id)}
                            className="btn btn-outline-primary btn-sm"
                            title="Descargar PDF"
                          >
                            <Download size={14} />
                          </button>
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