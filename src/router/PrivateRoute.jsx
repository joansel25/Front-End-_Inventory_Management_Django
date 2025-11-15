// router/PrivateRoute.jsx - VERSIÓN CORREGIDA
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, rolPermitido }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accesoPermitido, setAccesoPermitido] = useState(false);

  useEffect(() => {
    const verificarAcceso = async () => {
      try {
        const token = localStorage.getItem("access");
        
        if (!token) {
          navigate("/login");
          return;
        }

        // Verificar si el token es válido
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        
        if (Date.now() >= exp) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        const rol = localStorage.getItem("rol")?.toLowerCase();
        
        if (!rol) {
          navigate("/login");
          return;
        }

        // Verificar acceso para array o string
        let tieneAcceso = false;
        
        if (Array.isArray(rolPermitido)) {
          tieneAcceso = rolPermitido.some(r => r.toLowerCase() === rol);
        } else {
          tieneAcceso = rol === rolPermitido.toLowerCase();
        }

        if (!tieneAcceso) {
          // Redirigir al dashboard según el rol
          switch(rol) {
            case "administrador":
              navigate("/admin");
              break;
            case "empleado":
              navigate("/empleado");
              break;
            case "cliente":
              navigate("/cliente");
              break;
            default:
              navigate("/login");
          }
          return;
        }

        setAccesoPermitido(true);
      } catch (error) {
        console.error("Error verificando acceso:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarAcceso();
  }, [navigate, rolPermitido]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100"
           style={{ background: "linear-gradient(135deg, #d0f0c0, #b2dfdb)" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Verificando acceso...</span>
        </div>
      </div>
    );
  }

  return accesoPermitido ? children : null;
};

export default PrivateRoute;