import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({ menu_item: "", description: "", price: 0, quantity: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // State for editing item

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/menu_items");
      setMenuItems(response.data);
    } catch (error) {
      toast.error("Failed to fetch menu items!");
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingItem) {
        // Update existing menu item
        await axios.patch(`http://127.0.0.1:8000/menu_items/${editingItem.id}`, form);
        toast.success("Menu Item Updated Successfully!");
      } else {
        // Create new menu item
        await axios.post("http://127.0.0.1:8000/menu_items", form);
        toast.success("Menu Item Added Successfully!");
      }
      fetchMenuItems();
      setForm({ menu_item: "", description: "", price: 0, quantity: 0 });
      setShowModal(false);
      setEditingItem(null);
    } catch (error) {
      toast.error("Failed to save menu item!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/menu_items/${id}`);
      fetchMenuItems();
      toast.success("Menu Item Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete menu item!");
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setForm({
      menu_item: item.menu_item,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
    });
    setShowModal(true);
  };

  return (
    <div>
      <h1>Menu Items</h1>

      {/* Button to trigger modal */}
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Menu Item
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingItem ? "Edit Menu Item" : "Add Menu Item"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  setForm({ menu_item: "", description: "", price: 0, quantity: 0 });
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
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Menu Item"
                    value={form.menu_item}
                    onChange={(e) => setForm({ ...form, menu_item: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Menu Item</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.menu_item}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() => handleEditClick(item)}
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <Link to={`/menu-items/${item.id}/orders`} className="btn btn-primary ms-2">
                  View Orders
                </Link>
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

export default MenuItemsPage;
