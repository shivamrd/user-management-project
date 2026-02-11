// import { useState } from "react";
// import api from "../api/axios";
// import { toast } from "react-toastify";

// export default function AddUserModal({ onClose, onUserAdded }) {
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobileNo: "",
//     rollno: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await api.post("/users", user, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       toast.success("User added successfully");
//       onUserAdded();
//       onClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to add user");
//     }
//   };

//   return (
//     <div style={overlay}>
//       <div style={modal}>
//         <h2>Add User</h2>

//         {Object.keys(user).map((key) => (
//           <input
//             key={key}
//             name={key}
//             placeholder={key}
//             value={user[key]}
//             onChange={handleChange}
//             style={input}
//           />
//         ))}

//         <div style={{ display: "flex", gap: 10 }}>
//           <button onClick={handleSubmit} style={saveBtn}>
//             Save
//           </button>
//           <button onClick={onClose} style={cancelBtn}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const overlay = {
//   position: "fixed",
//   inset: 0,
//   background: "rgba(0,0,0,0.5)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const modal = {
//   background: "#fff",
//   padding: 20,
//   borderRadius: 10,
//   width: 350,
// };

// const input = {
//   width: "100%",
//   padding: 10,
//   marginBottom: 10,
// };

// const saveBtn = {
//   flex: 1,
//   background: "#28a745",
//   color: "#fff",
//   border: "none",
//   padding: 10,
// };

// const cancelBtn = {
//   flex: 1,
//   background: "#6c757d",
//   color: "#fff",
//   border: "none",
//   padding: 10,
// };
