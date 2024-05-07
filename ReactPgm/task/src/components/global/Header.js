import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function Header(){
      const inputStyle = {
        backgroundColor: '#EEEEEE',
        padding: '8px 40px',
        border: 'none',
        borderRadius: '40px',
        width: '800px',
        display: 'flex',
        alignItems: 'center',
        marginLeft:'30px',
        };
        
    return(
        <>
      
<nav className="navbar navbar-expand-lg navbar-light bg-white">
       

      <form className="search-bar">
      <input
        style={inputStyle}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      
    </form>
    <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav ms-auto" style={{ display: 'flex', alignItems: 'center' }}>
    <li className="nav-item">
      <a className="nav-link" href="/home">Men</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/plp">Women</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/pdp">Kids</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/cart">Offers</a>
    </li>
  </ul>
</div>

</nav>
      
      
        </>
    )
}