import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Refs from '../../useRefs/Refs';

export default function Navigation() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink exact className="nav-link" activeclassname="active" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/learn">Learn</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/reference">Reference</NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/community">Community</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/blog">Blog</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/users">Users</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/states">States</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/context">Context</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/effects">Effects</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/product">Products</NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/sidebar">Sidebar</NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/createproject">CreateProject</NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/login">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/api">
                  API
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faShoppingCart} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHeart} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
