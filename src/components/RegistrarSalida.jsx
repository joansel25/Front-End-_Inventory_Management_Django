import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function RegistrarSalida() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    producto: "",
    cantidad: "",
    cliente: "",
    motivo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salida registrada:", formData);
    alert("✅ Salida registrada correctamente");
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-danger fw-bold">📤 Registrar Salida</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-danger d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Formulario */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title text-danger mb-4">Información de la Salida</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Producto</label>
                <input
                  type="text"
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: Camiseta Mystic Angel"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: 5"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Cliente</label>
                <input
                  type="text"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nombre del cliente"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Motivo de la salida</label>
                <textarea
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Ej: Venta al cliente, producto dañado, muestra, etc."
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-danger d-flex align-items-center gap-2">
                <Save size={18} /> Guardar Salida
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}