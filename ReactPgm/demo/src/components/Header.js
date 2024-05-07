import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import logo from '../rlogo1.png'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function Header(){
    // const inputStyle = {
    //     backgroundColor: '#EEEEEE',
    //     padding: '8px',
    //     border: 'none',
    //     borderRadius: '40px',
    //     width: '500px',
    //   };
    const searchIcon={
      position: 'absolute',
      left: '71px',
    };
      const inputStyle = {
        backgroundColor: '#EEEEEE',
        padding: '8px 40px',
        border: 'none',
        borderRadius: '40px',
        width: '800px',
        display: 'flex',
        alignItems: 'center',
        };
        const miniButtonStyle = {
          marginLeft: '-6rem', // This will push the buttons to the right
      padding: '0px',
      border: 'none',
      color: '#9E9E9E',
      cursor: 'pointer',
      borderRadius: '5px',
      width: '40px',
      backgroundColor:'white',
      fontSize:'13px',
        }; 
  
        const miniButtonStyleK = {
          marginLeft: '4px', // Add some space between the buttons
          padding: '0px',
          border: 'none',
          color: '#9E9E9E',
          cursor: 'pointer',
          borderRadius: '5px',
          width: '20px',
          backgroundColor:'white',
          fontSize:'13px',
        };
    return(
        <>
      
<nav className="navbar navbar-expand-lg navbar-light bg-white">
      {/* <img src="/logo512.png" alt="" width="30" height="24" class="d-inline-block align-text-top"/> */}
     <a href="/">
     <img src={logo} alt="Logo" />
     </a> 

      <form className="search-bar">
      <FontAwesomeIcon style={searchIcon} icon={faSearch} />
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
  <ul className="navbar-nav ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
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
    {/* <li>
      <FontAwesomeIcon icon={faMoon} />
    </li>
    <li>
      <FontAwesomeIcon icon={faCat} />
    </li> */}
  </ul>
</div>

</nav>
      
      
        </>
    )
}