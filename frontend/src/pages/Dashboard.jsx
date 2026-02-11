import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setUser(res.data.user);
      setFormData(res.data.user);
    } catch {
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", formData);
      setUser(formData);
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading profile...</p>;

  return (
    <Layout role="user">
      <h1 style={{ marginBottom: 25 }}>User Dashboard</h1>

      {/* VIEW MODE */}
      {!editing ? (
        <div style={card}>
          <h3 style={{ marginBottom: 20 }}>Profile Information</h3>

          <div style={grid}>
            <Info label="Roll No" value={user.rollno} />
            <Info label="Email" value={user.email} />
            <Info label="First Name" value={user.firstName} />
            <Info label="Last Name" value={user.lastName} />
            <Info label="Mobile" value={user.mobileNo} />
            <Info label="Country Code" value={user.countrycode} />
            <Info label="Aadhar" value={user.aadharCardNo} />
          </div>

          <button style={primaryBtn} onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        /* EDIT MODE */
        <form onSubmit={handleUpdate} style={card}>
          <h3 style={{ marginBottom: 20 }}>Edit Profile</h3>

          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Mobile" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
          <Input label="Country Code" name="countrycode" value={formData.countrycode} onChange={handleChange} />
          <Input label="Aadhar" name="aadharCardNo" value={formData.aadharCardNo} onChange={handleChange} />

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button type="submit" style={primaryBtn}>Save</button>
            <button type="button" style={secondaryBtn} onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </Layout>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Info = ({ label, value }) => (
  <div>
    <p style={{ fontSize: 13, color: "#666" }}>{label}</p>
    <p style={{ fontWeight: "bold" }}>{value || "N/A"}</p>
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 15 }}>
    <label style={{ display: "block", marginBottom: 5 }}>{label}</label>
    <input
      {...props}
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 6,
        border: "1px solid #ccc",
      }}
    />
  </div>
);

/* ---------------- STYLES ---------------- */

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  maxWidth: 700,
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
};

const primaryBtn = {
  marginTop: 25,
  padding: "10px 18px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const secondaryBtn = {
    marginTop: 25,
  padding: "10px 18px",
  background: "#e3cb8b",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
