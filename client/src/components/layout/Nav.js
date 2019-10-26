import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/items" className="nav-link">Items</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;