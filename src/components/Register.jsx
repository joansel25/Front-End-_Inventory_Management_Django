import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("empleado");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/usuarios/", {
        nombre,
        apellido,
        email,
        username,
        password,
        rol,
      });
      alert("✅ Usuario registrado correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error.response?.data);
      alert("❌ Error al registrar usuario. Verifica los datos.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #c8e6c9, #e8f5e9)",
      }}
    >
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "400px" }}>
        <h3 className="text-center text-success mb-4 fw-bold">Registrarse</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Apellido</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Rol</label>
            <select
              className="form-select"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="administrador">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold shadow-sm"
          >
            Registrarme
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted mb-1">¿Ya tienes cuenta?</p>
          <Link to="/" className="fw-bold text-success text-decoration-none">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;