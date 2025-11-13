import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol")?.trim().toLowerCase();
    if (rol !== "administrador") {
      navigate("/"); // Redirige si no tiene permiso
    }
  }, [navigate]);

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      }}
    >
      {/* Navbar superior */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">💊 Farmacia Salud+</span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Contenido del panel */}
      <div className="container my-5 flex-grow-1">
        <h2 className="text-center text-success fw-bold mb-4">
          Panel de Administración
        </h2>
        <p className="text-center text-muted mb-5">
          Desde aquí puedes gestionar los módulos principales del sistema de
          inventario de Farmacia Salud+.
        </p>

        <div className="row g-4 justify-content-center">
          {/* Usuarios */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 text-center">
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">👤 Usuarios</h5>
                <p className="card-text text-muted">
                  Agrega, edita o elimina usuarios del sistema.
                </p>
                <button
                  onClick={() => navigate("/usuarios")}
                  className="btn btn-success w-100 fw-semibold shadow-sm"
                >
                  Ir a Usuarios
                </button>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 text-center">
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">💊 Productos</h5>
                <p className="card-text text-muted">
                  Administra los productos y el stock disponible.
                </p>
                <button
                  onClick={() => navigate("/productos")}
                  className="btn btn-success w-100 fw-semibold shadow-sm"
                >
                  Ir a Productos
                </button>
              </div>
            </div>
          </div>

          {/* Movimientos */}
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4 h-100 text-center">
              <div className="card-body">
                <h5 className="card-title text-success fw-bold">📦 Movimientos</h5>
                <p className="card-text text-muted">
                  Registra ingresos y egresos del inventario.
                </p>
                <button
                  onClick={() => navigate("/movimientos")}
                  className="btn btn-success w-100 fw-semibold shadow-sm"
                >
                  Ir a Movimientos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-success text-white text-center py-3 mt-auto shadow-sm">
        <small>© 2025 Farmacia Salud+. Todos los derechos reservados.</small>
      </footer>
    </div>
  );
}