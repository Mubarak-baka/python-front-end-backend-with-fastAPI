import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Component/Navbar";
import UsersPage from "../Component/UserPage";
import MenuItemsPage from "../Component/MenuItemsPage";
import OrdersPage from "../Component/OrdersPage";


import UserOrderPage from "../Component/UserOrderPage"; // Import the new page
import MenuItemOrdersPage from "../Component/MenuItemOrdersPage";
function App() {
  return (
    <Router>
      <Navbar />
      
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<UsersPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/OrdersPage" element={<OrdersPage />} />
          <Route path="/menu-items" element={<MenuItemsPage />} />
          <Route path="/UserorderPage" element={<UserOrderPage />} />
          
          <Route path="/users/:userId/orders" element={<UserOrderPage />} /> 
          <Route path="/menu-items/:menuItemId/orders" element={<MenuItemOrdersPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
