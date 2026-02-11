import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function RoleRoute({ children, role }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const decoded = jwtDecode(token);
  return decoded.role === role ? children : <Navigate to="/dashboard" />;
}
