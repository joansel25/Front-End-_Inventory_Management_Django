import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";

export default function AjustarStock() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-secondary fw-bold">
          <Wrench size={28} className="me-2" />
          Ajustar Stock
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Descripción */}
      <p className="text-muted mb-4">
        Usa este formulario para <strong>modificar manualmente</strong> el stock de un producto
        cuando haya diferencias entre el inventario físico y el sistema.
      </p>

      {/* Formulario */}
      <div className="card shadow-sm border-0 p-4">
        <h5 className="text-secondary mb-3">Formulario de ajuste</h5>

        <form>
          <div className="mb-3">
            <label className="form-label">Producto</label>
            <select className="form-select" required>
              <option value="">Seleccionar producto...</option>
              <option>Producto A</option>
              <option>Producto B</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Cantidad actual</label>
            <input type="number" className="form-control" placeholder="Ej: 20" readOnly />
          </div>

          <div className="mb-3">
            <label className="form-label">Nueva cantidad</label>
            <input type="number" className="form-control" placeholder="Ej: 25" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Motivo del ajuste</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Ej: Diferencia en conteo físico o devolución"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-secondary w-100">
            Guardar Ajuste
          </button>
        </form>
      </div>
    </div>
  );
}