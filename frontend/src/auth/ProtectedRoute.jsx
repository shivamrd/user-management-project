import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" />;

  if (adminOnly) {
    try {
      // Decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        // Not admin → redirect to normal dashboard
        return <Navigate to="/dashboard" />;
      }
    } catch (err) {
      // If token is invalid, redirect to login
      return <Navigate to="/login" />;
    }
  }

  return children;
}
