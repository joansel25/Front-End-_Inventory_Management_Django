import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/token/", {
        username,
        password,
      });

      // Guardar tokens y rol en localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      const rol = response.data.user?.rol?.trim().toLowerCase(); // Normalizamos

      localStorage.setItem("rol", rol);

      alert("✅ Inicio de sesión exitoso");

      // Redirigir según el rol
      if (rol === "administrador") {
        navigate("/admin");
      } else if (rol === "empleado") {
        navigate("/empleado");
      } else {
        alert("❌ Rol no reconocido. Consulta con el administrador.");
      }

    } catch (error) {
      console.error("Error de login:", error.response?.data);
      alert("❌ Credenciales incorrectas o error al conectar con el servidor.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;