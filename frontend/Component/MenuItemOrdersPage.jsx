// MenuItemOrdersPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MenuItemOrdersPage() {
  const { menuItemId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchMenuItemOrders();
  }, []);

  const fetchMenuItemOrders = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/menu-items/${menuItemId}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders for menu item:", error);
    }
  };

  return (
    <div>
      <h1>Orders for Menu Item {menuItemId}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
           
            <th>Quantity</th>
            <th>Price</th>
            <th>Table Number</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.table_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuItemOrdersPage;
