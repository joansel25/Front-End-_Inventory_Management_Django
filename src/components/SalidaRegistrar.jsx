import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrarSalida() {
  const [productos, setProductos] = useState([]);
  const [salida, setSalida] = useState({ producto: "", cantidad: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Traer lista de productos disponibles
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/productos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        alert("❌ No se pudieron cargar los productos.");
      }
    };

    fetchProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/movimientos/",
        {
          tipo: "salida",
          id_producto: salida.producto,
          cantidad: salida.cantidad,
          id_cliente: null, // opcional si no aplica
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Salida registrada correctamente");
      setSalida({ producto: "", cantidad: "" });
      navigate("/empleado");
    } catch (error) {
      console.error("Error al registrar salida:", error);
      alert("❌ No se pudo registrar la salida.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-danger fw-bold mb-4">Registrar Salida de Inventario</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Producto</label>
          <select
            className="form-select"
            value={salida.producto}
            onChange={(e) => setSalida({ ...salida, producto: e.target.value })}
            required
          >
            <option value="">Selecciona un producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} (Stock: {p.stock})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={salida.cantidad}
            onChange={(e) => setSalida({ ...salida, cantidad: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger">
          Registrar Salida
        </button>
      </form>
    </div>
  );
}