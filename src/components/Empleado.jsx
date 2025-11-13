import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, ClipboardList, PackageSearch, LogOut } from "lucide-react";

export default function Empleado() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold">👨‍💼 Panel del Empleado</h1>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-primary d-flex align-items-center gap-2"
        >
          <ArrowLeft size={18} /> Volver
        </button>
      </div>

      {/* Descripción */}
      <p className="text-muted mb-4">
        Bienvenido al panel del empleado. Aquí puedes registrar ventas, controlar salidas de productos y consultar el stock actual.
      </p>

      {/* Accesos rápidos */}
      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card h-100 text-center p-4 shadow-sm border-0"
            onClick={() => navigate("/registrar-venta")}
            style={{ cursor: "pointer", backgroundColor: "#d4edda", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <ShoppingCart size={50} className="text-success mb-3" />
            <h5 className="fw-bold text-success">Registrar Venta</h5>
            <p className="text-muted small">Crea una factura de venta para un cliente.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 text-center p-4 shadow-sm border-0"
            onClick={() => navigate("/movimientos")}
            style={{ cursor: "pointer", backgroundColor: "#f8d7da", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <ClipboardList size={50} className="text-danger mb-3" />
            <h5 className="fw-bold text-danger">Registrar Salida</h5>
            <p className="text-muted small">Registra movimientos de salida de inventario.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card h-100 text-center p-4 shadow-sm border-0"
            onClick={() => navigate("/productos")}
            style={{ cursor: "pointer", backgroundColor: "#d1ecf1", transition: "all 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <PackageSearch size={50} className="text-info mb-3" />
            <h5 className="fw-bold text-info">Consultar Productos</h5>
            <p className="text-muted small">Revisa existencias y detalles de productos.</p>
          </div>
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <div className="text-center mt-5">
        <button className="btn btn-outline-danger d-flex align-items-center mx-auto gap-2">
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}