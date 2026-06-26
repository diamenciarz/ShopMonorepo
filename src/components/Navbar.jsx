import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="nav-logo">
          THREADLY
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Shop All
            </NavLink>
          </li>
          <li>
            <NavLink to="/boats" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Boats
            </NavLink>
          </li>
          <li>
            <NavLink to="/notebook" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Notebook
            </NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-btn">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}