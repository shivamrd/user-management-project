// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { toast } from "react-toastify";
// import Layout from "../components/Layout";
// import { AiOutlineSearch } from "react-icons/ai";

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");


//   const [editOpen, setEditOpen] = useState(false);
// const [editUser, setEditUser] = useState({
//   firstName: "",
//   lastName: "",
//   email: "",
//   mobileNo: "",
// });



//   const [selectedUser, setSelectedUser] = useState(null);
//   const [viewOpen, setViewOpen] = useState(false);


//   const fetchUsers = async () => {
//     try {
//       const res = await api.get("/users", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setUsers(Array.isArray(res.data) ? res.data : []);
//     } catch {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete user?")) return;

//     try {
//       await api.delete(`/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setUsers(users.filter((u) => u._id !== id));
//       toast.success("User deleted");
//     } catch {
//       toast.error("Delete failed");
//     }
//   };
// const handleView = (id) => {
//   const user = users.find((u) => u._id === id);
//   setSelectedUser(user);
//   setViewOpen(true);
// };



// const handleEditOpen = (user) => {
//   setEditUser(user);
//   setEditOpen(true);
// };



// const handleEditSave = async () => {
//   try {
//     await api.put(
//       `/users/${editUser._id}`,
//       {
//         firstName: editUser.firstName,
//         lastName: editUser.lastName,
//         email: editUser.email,
//         mobileNo: editUser.mobileNo,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     setUsers(users.map((u) =>
//       u._id === editUser._id ? editUser : u
//     ));

//     toast.success("User updated");
//     setEditOpen(false);
//   } catch {
//     toast.error("Update failed");
//   }
// };


 
//   const filteredUsers = users.filter(
//     (u) =>
//       u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase()) ||
//       u.rollno?.toString().includes(search)
//   );

//   return (
//     <Layout role="admin">
//       <h1 style={{ marginBottom: 20 }}>User Management</h1>



//       {/* SEARCH */}
//       <div style={searchBox}>
//         <AiOutlineSearch />
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={searchInput}
//         />
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p>Loading users...</p>
//       ) : filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div style={tableCard}>
//           <table style={table}>
//             <thead>
//               <tr style={thead}>
//                 <th style={th}>Roll No</th>
//                 <th style={th}>Name</th>
//                 <th style={th}>Email</th>
//                 <th style={th}>Mobile</th>
//                 <th style={th}>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((u) => (
//                 <tr key={u._id} style={row}>
//                   <td style={td}>{u.rollno}</td>
//                   <td style={td}>{u.firstName} {u.lastName}</td>
//                   <td style={td}>{u.email}</td>
//                   <td style={td}>{u.mobileNo}</td>
//                   <td style={td}>
//                     <button
//                       onClick={() => handleDelete(u._id)}
//                       style={deleteBtn}
//                     >
//                       Delete
//                     </button>
                    
//                     <button
//                       onClick={() => handleView(u._id)}
//                       style={viewBtn}
//                     >
//                       view
//                     </button>

//                     <button
//                         onClick={() => handleEditOpen(u)}
//                        style={editBtn}
//                       >
//                          Edit
//                     </button>

//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//           {/* VIEW USER MODAL */}
//     {viewOpen && selectedUser && (
//       <div style={modalOverlay}>
//         <div style={modalBox}>
//           <h2>User Details</h2>

//           <p><b>Roll No:</b> {selectedUser.rollno}</p>
//           <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
//           <p><b>Email:</b> {selectedUser.email}</p>
//           <p><b>Mobile:</b> {selectedUser.mobileNo}</p>

//           <button
//             style={closeBtn}
//             onClick={() => setViewOpen(false)}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     )}
//       {editOpen && (
//   <div style={modalOverlay}>
//     <div style={modalBox}>
//       <h2>Edit User</h2>

//       <input
//         style={input}
//         value={editUser.firstName}
//         onChange={(e) =>
//           setEditUser({ ...editUser, firstName: e.target.value })
//         }
//         placeholder="First Name"
//       />

//       <input
//         style={input}
//         value={editUser.lastName}
//         onChange={(e) =>
//           setEditUser({ ...editUser, lastName: e.target.value })
//         }
//         placeholder="Last Name"
//       />

//       <input
//         style={input}
//         value={editUser.email}
//         onChange={(e) =>
//           setEditUser({ ...editUser, email: e.target.value })
//         }
//         placeholder="Email"
//       />

//       <input
//         style={input}
//         value={editUser.mobileNo}
//         onChange={(e) =>
//           setEditUser({ ...editUser, mobileNo: e.target.value })
//         }
//         placeholder="Mobile"
//       />

//       <div style={{ display: "flex", gap: 10 }}>
//         <button onClick={handleEditSave} style={saveBtn}>
//           Save
//         </button>
//         <button onClick={() => setEditOpen(false)} style={closeBtn}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </Layout>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const searchBox = {
//   display: "flex",
//   alignItems: "center",
//   background: "#fff",
//   padding: "10px 15px",
//   borderRadius: 8,
//   maxWidth: 300,
//   marginBottom: 20,
//   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// };

// const searchInput = {
//   border: "none",
//   outline: "none",
//   marginLeft: 10,
//   width: "100%",
// };

// const tableCard = {
//   background: "#fff",
//   borderRadius: 10,
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   overflowX: "auto",
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
// };

// const thead = {
//   background: "#4f46e5",
//   color: "#fff",
// };

// const th = {
//   padding: 12,
//   textAlign: "left",
// };

// const td = {
//   padding: 12,
// };

// const row = {
//   borderBottom: "1px solid #eee",
// };

// const deleteBtn = {
//   background: "#dc3545",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   cursor: "pointer",
// };
// const viewBtn ={
//   background: "#f78a2a",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   marginLeft: 10,
//   cursor: "pointer",
// }

// const modalOverlay = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   background: "rgba(0,0,0,0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,
// };

// const modalBox = {
//   background: "#fff",
//   padding: 25,
//   borderRadius: 10,
//   width: "90%",
//   maxWidth: 400,
//   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
// };

// const closeBtn = {
//   marginTop: 20,
//   background: "#4f46e5",
//   color: "#fff",
//   border: "none",
//   padding: "8px 14px",
//   borderRadius: 6,
//   cursor: "pointer",
// };

// const editBtn = {
//   background: "#0ea5e9",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   marginLeft: 10,
//   cursor: "pointer",
// };

// const input = {
//   width: "100%",
//   padding: "8px 10px",
//   marginBottom: 10,
//   borderRadius: 6,
//   border: "1px solid #ddd",
// };

// const saveBtn = {
//   background: "#22c55e",
//   color: "#fff",
//   border: "none",
//   padding: "8px 18px",
//   borderRadius: 6,
//   marginTop: 19,
//   cursor: "pointer",
// };


import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { AiOutlineSearch } from "react-icons/ai";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);



  // FETCH USERS (SERVER SIDE SEARCH + PAGINATION)

  const fetchUsers = async () => {
    setLoading(true);

    try {

      const res = await api.get(`/users?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);

    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [page, search]);



  // DELETE USER

  const handleDelete = async (id) => {

    if (!window.confirm("Delete user?")) return;

    try {

      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted");

      fetchUsers();

    } catch {
      toast.error("Delete failed");
    }
  };



  // VIEW USER

  const handleView = (id) => {

    const user = users.find((u) => u._id === id);

    setSelectedUser(user);
    setViewOpen(true);
  };



  // EDIT USER

  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditOpen(true);
  };


  const handleEditSave = async () => {

    try {

      await api.put(
        `/users/${editUser._id}`,
        {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          email: editUser.email,
          mobileNo: editUser.mobileNo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("User updated");

      setEditOpen(false);

      fetchUsers();

    } catch {
      toast.error("Update failed");
    }
  };



  // PAGINATION HANDLERS

  const nextPage = () => {

    if (page < totalPages) {
      setPage(page + 1);
    }

  };

  const prevPage = () => {

    if (page > 1) {
      setPage(page - 1);
    }

  };



  return (
    <Layout role="admin">

      <h1 style={{ marginBottom: 20 }}>User Management</h1>


      {/* SEARCH */}

      <div style={searchBox}>
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          style={searchInput}
        />
      </div>



      {/* TABLE */}

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (

        <div style={tableCard}>

          <table style={table}>

            <thead style={thead}>
              <tr>
                <th style={th}>Roll No</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Mobile</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>

              {users.map((u) => (

                <tr key={u._id} style={row}>

                  <td style={td}>{u.rollno}</td>
                  <td style={td}>{u.firstName} {u.lastName}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.mobileNo}</td>

                  <td style={td}>

                    <button
                      onClick={() => handleDelete(u._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleView(u._id)}
                      style={viewBtn}
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEditOpen(u)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}



      {/* PAGINATION */}

      <div style={paginationBox}>

        <button
          onClick={prevPage}
          disabled={page === 1}
          style={pageBtn}
        >
          Prev
        </button>

        <span style={{ fontWeight: "bold" }}>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          style={pageBtn}
        >
          Next
        </button>

      </div>



      {/* VIEW USER MODAL */}

      {viewOpen && selectedUser && (

        <div style={modalOverlay}>

          <div style={modalBox}>

            <h2>User Details</h2>

            <p><b>Roll No:</b> {selectedUser.rollno}</p>
            <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Mobile:</b> {selectedUser.mobileNo}</p>

            <button
              style={closeBtn}
              onClick={() => setViewOpen(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}



      {/* EDIT USER MODAL */}

      {editOpen && (

        <div style={modalOverlay}>

          <div style={modalBox}>

            <h2>Edit User</h2>

            <input
              style={input}
              value={editUser.firstName}
              onChange={(e) =>
                setEditUser({ ...editUser, firstName: e.target.value })
              }
              placeholder="First Name"
            />

            <input
              style={input}
              value={editUser.lastName}
              onChange={(e) =>
                setEditUser({ ...editUser, lastName: e.target.value })
              }
              placeholder="Last Name"
            />

            <input
              style={input}
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              style={input}
              value={editUser.mobileNo}
              onChange={(e) =>
                setEditUser({ ...editUser, mobileNo: e.target.value })
              }
              placeholder="Mobile"
            />

            <div style={{ display: "flex", gap: 10 }}>

              <button onClick={handleEditSave} style={saveBtn}>
                Save
              </button>

              <button onClick={() => setEditOpen(false)} style={closeBtn}>
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </Layout>
  );
}




/* ---------------- STYLES ---------------- */

const searchBox = {
  display: "flex",
  alignItems: "center",
  background: "#fff",
  padding: "10px 15px",
  borderRadius: 8,
  maxWidth: 300,
  marginBottom: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const searchInput = {
  border: "none",
  outline: "none",
  marginLeft: 10,
  width: "100%",
};

const tableCard = {
  background: "#fff",
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const thead = {
  background: "#4f46e5",
  color: "#fff",
};

const th = {
  padding: 12,
  textAlign: "left",
};

const td = {
  padding: 12,
};

const row = {
  borderBottom: "1px solid #eee",
};

const deleteBtn = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const viewBtn = {
  background: "#f78a2a",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  marginLeft: 10,
  cursor: "pointer",
};

const editBtn = {
  background: "#0ea5e9",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  marginLeft: 10,
  cursor: "pointer",
};

const paginationBox = {
  marginTop: 20,
  display: "flex",
  gap: 20,
  alignItems: "center",
};

const pageBtn = {
  padding: "6px 14px",
  borderRadius: 6,
  border: "none",
  background: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalBox = {
  background: "#fff",
  padding: 25,
  borderRadius: 10,
  width: "90%",
  maxWidth: 400,
};

const closeBtn = {
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
};

const saveBtn = {
  background: "#22c55e",
  color: "#fff",
  border: "none",
  padding: "8px 18px",
  borderRadius: 6,
  cursor: "pointer",
};

const input = {
  width: "100%",
  padding: "8px 10px",
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ddd",
};