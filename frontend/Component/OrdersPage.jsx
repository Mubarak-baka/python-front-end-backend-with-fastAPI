import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    menu_item_id: "",
    quantity: 0,
    table_number: 0,
    price: 0,
    user_id: "",
  });
  const [editingOrder, setEditingOrder] = useState(null); // State for tracking editing order

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/orders");
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders!");
    }
  };

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
      if (editingOrder) {
        // Update existing order
        await axios.patch(`http://127.0.0.1:8000/orders/${editingOrder.id}`, form);
        toast.success("Order Updated Successfully!");
      } else {
        // Create new order
        await axios.post("http://127.0.0.1:8000/orders", form);
        toast.success("Order Created Successfully!");
      }
      fetchOrders();
      resetForm();
    } catch (error) {
      toast.error("Failed to save order!");
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setForm({
      menu_item_id: order.menu_item_id,
      quantity: order.quantity,
      table_number: order.table_number,
      price: order.price,
      user_id: order.user_id,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/orders/${id}`);
      fetchOrders();
      toast.success("Order Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete order!");
    }
  };

  const resetForm = () => {
    setForm({ menu_item_id: "", quantity: 0, table_number: 0, price: 0, user_id: "" });
    setEditingOrder(null);
  };

  return (
    <div>
      <h1>{editingOrder ? "Edit Order" : "Create Order"}</h1>

      {/* Order Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateOrUpdate();
        }}
      >
        <div className="mb-3">
          <label htmlFor="menu_item_id" className="form-label">Menu Item</label>
          <select
            id="menu_item_id"
            className="form-select"
            value={form.menu_item_id}
            onChange={(e) => {
              const selectedItem = menuItems.find(item => item.id === Number(e.target.value));
              setForm({
                ...form,
                menu_item_id: e.target.value,
                price: selectedItem ? selectedItem.price : 0,
              });
            }}
          >
            <option value="">Select a Menu Item</option>
            {menuItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.menu_item} - ${item.price}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            id="quantity"
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="table_number" className="form-label">Table Number</label>
          <input
            id="table_number"
            type="number"
            className="form-control"
            placeholder="Table Number"
            value={form.table_number}
            onChange={(e) => setForm({ ...form, table_number: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            id="price"
            type="number"
            className="form-control"
            placeholder="Price"
            value={form.price}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID</label>
          <input
            id="user_id"
            type="text"
            className="form-control"
            placeholder="User ID"
            value={form.user_id}
            onChange={(e) => setForm({ ...form, user_id: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingOrder ? "Update Order" : "Add Order"}
        </button>
        {editingOrder && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Orders Table */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Menu Item ID</th>
            <th>Menu Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Table Number</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.menu_item_id}</td>
              <td>{order.menu_item_name}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.table_number}</td>
              <td>{order.user_id}</td>
              <td>
                <button
                  onClick={() => handleEditClick(order)}
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default OrdersPage;
