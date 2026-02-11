import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Layout({ children, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.info("Logged out successfully");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={role} />

      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 60,
            background: "#f4f5f7",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              background: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </header>

        <main style={{ flex: 1, padding: 30, background: "#f4f5f7" }}>
          {children}
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
