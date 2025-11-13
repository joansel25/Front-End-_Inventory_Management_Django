import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegistrarEntrada() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    tipo: "entrada",
    cantidad: "",
    id_producto: "",
    id_cliente: "",
  });

  // Cargar productos y clientes desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRes = await axios.get("http://127.0.0.1:8000/api/productos/");
        const clientesRes = await axios.get("http://127.0.0.1:8000/api/clientes/");
        setProductos(productosRes.data);
        setClientes(clientesRes.data);
      } catch (error) {
        console.error("Error al cargar productos o clientes", error);
      }
    };
    fetchData();
  }, []);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/movimientos/", formData);
      alert("✅ Entrada registrada con éxito");
      navigate("/movimientos");
    } catch (error) {
      alert("❌ Error al registrar la entrada");
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">Registrar Entrada de Producto</h2>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-success d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="card shadow-sm p-4 border-0">
        <div className="mb-3">
          <label className="form-label fw-bold">Producto</label>
          <select
            name="id_producto"
            className="form-select"
            value={formData.id_producto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            className="form-control"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="Ingrese cantidad"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Cliente / Proveedor</label>
          <select
            name="id_cliente"
            className="form-select"
            value={formData.id_cliente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un cliente o proveedor</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold">
          Registrar Entrada
        </button>
      </form>
    </div>
  );
}