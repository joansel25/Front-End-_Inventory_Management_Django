import { useEffect, useState } from "react";
import axios from "axios";
import { UserPlus, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("http://127.0.0.1:8000/api/usuarios/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      await axios.post("http://127.0.0.1:8000/api/usuarios/", nuevoUsuario, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Usuario agregado correctamente");
      setShowModal(false);
      setNuevoUsuario({ username: "", email: "", password: "", rol: "" });
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("❌ No se pudo agregar el usuario.");
    }
  };

  return (
    <div className="container py-5">
      {/* Botón Volver */}
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
          <Users className="me-2" size={30} />
          Gestión de Usuarios
        </h2>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() => setShowModal(true)}
        >
          <UserPlus className="me-2" size={18} />
          Agregar Usuario
        </button>
      </div>

      <p className="text-muted mb-4">
        Desde aquí puedes visualizar, agregar, editar y eliminar los usuarios del sistema.
      </p>

      {/* Tabla */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.rol?.name || "Sin rol"}</td>
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
                  <td colSpan="5" className="text-center text-muted py-4">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Agregar Nuevo Usuario</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddUser}>
                  <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevoUsuario.username}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      value={nuevoUsuario.email}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={nuevoUsuario.password}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select
                      className="form-select"
                      value={nuevoUsuario.rol}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
                      }
                      required
                    >
                      <option value="">Selecciona un rol</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Empleado">Empleado</option>
                    </select>
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