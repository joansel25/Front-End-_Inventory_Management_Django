import { useState, useEffect } from "react";
import axios from "axios";
import { Package, PlusCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_proveedor: "",
  });

  const navigate = useNavigate();

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/productos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // Crear nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await axios.post("http://127.0.0.1:8000/api/productos/", nuevoProducto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Producto agregado correctamente");
      setShowModal(false);
      setNuevoProducto({
        nombre: "",
        precio: "",
        stock: "",
        id_categoria: "",
        id_proveedor: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("❌ No se pudo agregar el producto.");
    }
  };

  return (
    <div className="container py-5">
      {/* Botón volver */}
      <div className="mb-3">
        <button
          className="btn btn-outline-success d-flex align-items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="me-2" size={18} />
          Volver
        </button>
      </div>

      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-success d-flex align-items-center">
          <Package className="me-2" size={30} />
          Gestión de Productos
        </h2>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowModal(true)}
        >
          <PlusCircle className="me-2" size={18} />
          Agregar Producto
        </button>
      </div>

      <p className="text-muted mb-4">
        Desde aquí puedes visualizar, agregar, editar y eliminar los productos del inventario.
      </p>

      {/* Tabla de productos */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Valor Total</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.id_categoria?.nombre || "Sin categoría"}</td>
                    <td>{p.id_proveedor?.nombre || "Sin proveedor"}</td>
                    <td>${parseFloat(p.precio).toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>${(p.precio * p.stock).toFixed(2)}</td>
                    <td className="text-center">
                      <button className="btn btn-outline-primary btn-sm me-2">
                        Editar
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para agregar producto */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Agregar Nuevo Producto</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddProduct}>
                  <div className="mb-3">
                    <label className="form-label">Nombre del producto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoProducto.nombre}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={nuevoProducto.precio}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={nuevoProducto.stock}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoProducto.id_categoria}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, id_categoria: e.target.value })
                      }
                      placeholder="ID o nombre de la categoría"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoProducto.id_proveedor}
                      onChange={(e) =>
                        setNuevoProducto({ ...nuevoProducto, id_proveedor: e.target.value })
                      }
                      placeholder="ID o nombre del proveedor"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}