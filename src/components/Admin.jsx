import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");
    if (rol !== "administrador") { // minúscula, coincide con login
      navigate("/"); // redirige si no tiene permiso
    }
  }, [navigate]);

  return (
    <div className="p-6 bg-green-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800">Panel de Administrador</h1>
      <p>Desde aquí puedes gestionar usuarios, productos y movimientos del inventario.</p>
    </div>
  );
}