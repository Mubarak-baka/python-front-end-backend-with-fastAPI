
import React from "react";
import { Link } from "react-router-dom";


function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">FastAPI React App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu-items">Menu Items</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/OrdersPage">Orders</Link>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;