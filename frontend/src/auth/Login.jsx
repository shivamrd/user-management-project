import { useState } from "react";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");

      // Decode role from JWT
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      setTimeout(() => {
        if (payload.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }, 800);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #6a11cb, #2575fc)"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "15px",
        width: "360px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          

          <button type="submit" style={btnStyle}>
            Login
          </button>
        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  background: "#2575fc",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};
