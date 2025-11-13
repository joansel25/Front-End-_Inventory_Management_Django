import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function RegistrarVenta() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    cliente: "",
    detalles: [], // { producto, cantidad, precio_unitario, subtotal }
  });

  const [total, setTotal] = useState(0);

  // Obtener clientes y productos
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access");
      try {
        const clientesRes = await axios.get("http://127.0.0.1:8000/api/clientes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productosRes = await axios.get("http://127.0.0.1:8000/api/productos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientes(clientesRes.data);
        setProductos(productosRes.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  // Agregar producto a la venta
  const agregarProducto = (producto) => {
    const existe = venta.detalles.find((d) => d.producto === producto.id);
    if (existe) return; // no repetir producto
    setVenta({
      ...venta,
      detalles: [
        ...venta.detalles,
        { producto: producto.id, nombre: producto.nombre, cantidad: 1, precio_unitario: producto.precio, subtotal: producto.precio },
      ],
    });
  };

  // Actualizar cantidad y subtotal
  const actualizarCantidad = (index, cantidad) => {
    const detalles = [...venta.detalles];
    detalles[index].cantidad = cantidad;
    detalles[index].subtotal = cantidad * detalles[index].precio_unitario;
    setVenta({ ...venta, detalles });
    setTotal(detalles.reduce((acc, d) => acc + d.subtotal, 0));
  };

  // Eliminar producto de la venta
  const eliminarProducto = (index) => {
    const detalles = [...venta.detalles];
    detalles.splice(index, 1);
    setVenta({ ...venta, detalles });
    setTotal(detalles.reduce((acc, d) => acc + d.subtotal, 0));
  };

  // Guardar venta
  const guardarVenta = async () => {
    if (!venta.cliente || venta.detalles.length === 0) {
      alert("Selecciona un cliente y al menos un producto");
      return;
    }
    const token = localStorage.getItem("access");
    try {
      const empleadoId = localStorage.getItem("user_id"); // si guardas ID de empleado al login
      const facturaRes = await axios.post(
        "http://127.0.0.1:8000/api/facturas/",
        { id_cliente: venta.cliente, id_empleado: empleadoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Crear detalles de la venta
      for (const detalle of venta.detalles) {
        await axios.post(
          "http://127.0.0.1:8000/api/detalle-venta/",
          {
            id_factura: facturaRes.data.id,
            id_producto: detalle.producto,
            cantidad: detalle.cantidad,
            precio_unitario: detalle.precio_unitario,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert("✅ Venta registrada correctamente");
      navigate("/empleado");
    } catch (error) {
      console.error(error);
      alert("❌ Error al registrar la venta");
    }
  };

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success fw-bold"><ShoppingCart size={30} /> Registrar Venta</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-success d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Selección de cliente */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Cliente:</label>
        <select
          className="form-select"
          value={venta.cliente}
          onChange={(e) => setVenta({ ...venta, cliente: e.target.value })}
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} ({c.correo})
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      <div className="mb-4">
        <h5 className="fw-bold">Productos disponibles:</h5>
        <div className="d-flex flex-wrap gap-2">
          {productos.map((p) => (
            <button
              key={p.id}
              className="btn btn-outline-primary"
              onClick={() => agregarProducto(p)}
            >
              {p.nombre} (${p.precio})
            </button>
          ))}
        </div>
      </div>

      {/* Detalles de la venta */}
      {venta.detalles.length > 0 && (
        <div className="card shadow-sm mb-4 p-3">
          <h5 className="fw-bold">Detalle de la venta</h5>
          <table className="table mt-2">
            <thead className="table-success">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {venta.detalles.map((d, i) => (
                <tr key={i}>
                  <td>{d.nombre}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={d.cantidad}
                      min={1}
                      onChange={(e) => actualizarCantidad(i, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${d.precio_unitario}</td>
                  <td>${d.subtotal}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(i)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 className="text-end mt-2 fw-bold">Total: ${total}</h5>
        </div>
      )}

      <div className="text-center">
        <button className="btn btn-success btn-lg" onClick={guardarVenta}>
          Guardar Venta
        </button>
      </div>
    </div>
  );
}