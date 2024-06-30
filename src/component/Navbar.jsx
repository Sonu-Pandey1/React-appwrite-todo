// src/Navbar.js
import  { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand"></div>
        <button className="navbar-toggle" onClick={toggleNavbar}>
          ☰
        </button>
        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/storage">Storage</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
