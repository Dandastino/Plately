import { NavLink } from "react-router"
import React from 'react'
import './Navbar.css'

function Navbar () {
  return (
    <nav className="navbar">
      <NavLink 
        to="/home" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Home
      </NavLink>

      <NavLink 
        to="/admin" 
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
      >
        Add Dish
      </NavLink>
    </nav>
  );
}

export default Navbar