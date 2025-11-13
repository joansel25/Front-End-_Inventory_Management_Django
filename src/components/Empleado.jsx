import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Empleado() {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "empleado") { // minúscula, coincide con lo guardado
      navigate("/"); // redirige si no tiene permiso
    }
  }, [navigate]);

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800">Panel de Empleado</h1>
      <p>Desde aquí puedes registrar ventas y consultar productos disponibles.</p>
    </div>
  );
}