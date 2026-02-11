import { useState } from "react";
import api from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [form, setForm] = useState({
    rollno: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    countrycode: "+91",
    aadharCardNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/signup", form);
      toast.success("Signup successful!");
      setTimeout(() => (window.location.href = "/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="rollno"
            placeholder="Roll Number"
            onChange={handleChange}
            value={form.rollno}
            required
            style={input}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={form.firstName}
              required
              style={input}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={form.lastName}
              required
              style={input}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={form.email}
            required
            style={input}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              name="countrycode"
              placeholder="+91"
              onChange={handleChange}
              value={form.countrycode}
              style={{ ...input, width: "30%" }}
            />
            <input
              type="tel"
              name="mobileNo"
              placeholder="Mobile Number"
              onChange={handleChange}
              value={form.mobileNo}
              required
              style={{ ...input, width: "70%" }}
            />
          </div>

          <input
            name="aadharCardNo"
            placeholder="Aadhar Card Number"
            onChange={handleChange}
            value={form.aadharCardNo}
            style={input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            style={input}
          />

          <button type="submit" disabled={loading} style={button}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p style={footerText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #6a11cb, #2575fc)",
};

const card = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  width: "420px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
};

const title = {
  textAlign: "center",
  marginBottom: "25px",
  color: "#333",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "25px",
  border: "none",
  background: "#28a745",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const footerText = {
  marginTop: "15px",
  textAlign: "center",
};
