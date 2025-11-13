import { useState } from "react";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/usuario/", formData);
      setMessage("✅ Usuario registrado con éxito");
    } catch (err) {
      setMessage("❌ Error al registrar el usuario");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="apellido"
          placeholder="Apellido"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Registrarse
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}

export default Register;