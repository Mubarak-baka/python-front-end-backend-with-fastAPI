import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserOrdersPage() {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/users/${userId}/orders`
    );
    setOrders(response.data);
  };

  return (
    <div>
      <h1>Orders for User {userId}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Menu Item ID</th>
            <th>Menu Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Table Number</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserOrdersPage;