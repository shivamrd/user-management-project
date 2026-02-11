import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div
      style={{
        width: 220,
        height: "100vh",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        position: "fixed",
        padding: 20,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 40 }}>UserMS</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: 20 }}>
          <NavLink to="/dashboard" style={linkStyle}>
             Profile
          </NavLink>
        </li>

        {role === "admin" && (
          <li style={{ marginBottom: 20 }}>
            <NavLink to="/admin" style={linkStyle}>
              Manage Users
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

const linkStyle = {
  display: "block",
  padding: "10px 15px",
  borderRadius: 6,
  textDecoration: "none",
  color: "#fff",
  fontWeight: 500,
};
