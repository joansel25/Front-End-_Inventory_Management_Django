import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function Movimientos() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success fw-bold">📦 Movimientos de Inventario</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-success d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Descripción */}
      <p className="text-muted mb-4">
        Desde aquí puedes registrar <strong>entradas</strong>,{" "}
        <strong>salidas</strong> y <strong>ajustes</strong> del inventario.
      </p>

      {/* Sección de botones */}
      <div className="d-flex flex-wrap gap-3 mb-5">
        <button
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={() => navigate("/registrar-entrada")}
        >
          <PlusCircle size={18} /> Registrar Entrada
        </button>
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          onClick={() => navigate("/registrar-salida")}
        >
          <PlusCircle size={18} /> Registrar Salida
        </button>
        <button
          className="btn btn-secondary d-flex align-items-center gap-2"
          onClick={() => navigate("/ajustar-stock")}
        >
          <PlusCircle size={18} /> Ajustar Stock
        </button>
      </div>

      {/* Tabla de movimientos */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title text-success">Historial de Movimientos</h5>
          <table className="table table-hover mt-3">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No hay movimientos registrados aún.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}