import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [editingUser, setEditingUser] = useState(null); // Track user being edited
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users!");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingUser) {
        // Update user
        await axios.patch(`http://127.0.0.1:8000/users/${editingUser.id}`, form);
        toast.success("User Updated Successfully!");
      } else {
        // Create user
        await axios.post("http://127.0.0.1:8000/users", form);
        toast.success("User Added Successfully!");
      }
      fetchUsers();
      setForm({ name: "", email: "", phone: "" });
      setShowModal(false);
      setEditingUser(null);
    } catch (error) {
      toast.error("Failed to save user!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${id}`);
      fetchUsers();
      toast.success("User Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete user!");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, phone: user.phone });
    setShowModal(true);
  };

  const handleViewOrders = (userId) => {
    navigate(`/users/${userId}/orders`);
  };

  return (
    <div>
      <h1>Users</h1>

      {/* Button to trigger the modal */}
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add User
      </button>

      {/* Modal for adding/updating a user */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showModal ? "block" : "none" }}
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingUser ? "Edit User" : "Add User"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingUser(null);
                  setForm({ name: "", email: "", phone: "" });
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateOrUpdate();
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control mb-2"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="form-control mb-2"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <button type="submit" className="btn btn-primary w-100">
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button
                  onClick={() => handleEditClick(user)}
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleViewOrders(user.id)}
                  className="btn btn-primary ms-2"
                >
                  View Orders
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
}

export default UsersPage;
