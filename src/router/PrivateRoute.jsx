import { Navigate } from "react-router-dom";

function PrivateRoute({ children, rolPermitido }) {
  const rol = localStorage.getItem("rol");
  return rol === rolPermitido ? children : <Navigate to="/" />;
}

export default PrivateRoute;