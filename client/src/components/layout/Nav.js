import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav class="navbar navbar-expand-sm bg-light navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to="/items" className="nav-link">Items</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;