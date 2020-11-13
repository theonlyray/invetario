import React, {Component} from 'react';
import {Link} from 'react-router-dom';

function NavBar(){

    const navStyle = {
        color: 'Black'
    };
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">           
                <Link style={navStyle} to="/" className="navbar-brand">Inventory</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/sales" className="nav-link" aria-disabled="true">Add Sale</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/see_sales" className="nav-link" aria-disabled="true">See Sale</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link" aria-disabled="true">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link" aria-disabled="true">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" aria-disabled="true">About</Link>
                        </li>
                    </ul>
                </div>
                             
           </nav>
        );
}

export default NavBar;