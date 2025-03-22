import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">My App</h1>
        <ul className="nav-links">
          <li>
            <Link to="/logout" className="nav-link">LOGOUT</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
