import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.scss'; 

export default function Navbar() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/logs' ? 'active' : ''}>
          <Link to="/logs">Transaction Log</Link>
        </li>
        <li className={location.pathname === '/forms' ? 'active' : ''}>
          <Link to="/forms">Transaction Form</Link>
        </li>
      </ul>
    </nav>
  );
}
