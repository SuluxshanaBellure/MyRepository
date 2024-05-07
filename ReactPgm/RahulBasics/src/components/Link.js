import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import logo from '../rlogo1.png'; 

function Link() {
    const inputStyle = {
      backgroundColor: '#D3D3D3',
      padding: '8px',
      border: 'none',
      borderRadius: '40px',
      width: '900px',
      display: 'flex',
      alignItems: 'center',
      };
      const miniButtonStyle = {
        marginLeft: '-8rem', // This will push the buttons to the right
    padding: '4px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '10px',
    width: '60px',
      }; 

      const miniButtonStyleK = {
        marginLeft: '8px', // Add some space between the buttons
        padding: '4px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '10px',
        width: '30px',
      };
  return (
    <>
    {/* <div className="bg-info text-white text-center p-2"></div> */}

    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
      {/* <img src="/logo512.png" alt="" width="30" height="24" class="d-inline-block align-text-top"/> */}
      <img src={logo} alt="Logo" />

      <form className="search-bar">
      <input
        style={inputStyle}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button style={miniButtonStyle}>Ctrl</button>
      <button style={miniButtonStyleK}>K</button>
    </form>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <a className="nav-link" href="/learn">Learn</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reference">Reference</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/community">Community</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog">Blog</a>
            </li>
            <li>
      <FontAwesomeIcon icon={faMoon} />
      </li>
      <li>
      <FontAwesomeIcon icon={faCat} />
      </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Link;