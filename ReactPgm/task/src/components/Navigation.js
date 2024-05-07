import { NavLink } from 'react-router-dom';


export default function Navigation() {
  return (
    <>
      
          <ul class="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link"  to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/plp">
                PLP
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/pdp">
                PDP
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link"  to="/cart">
                Cart Page
              </NavLink>
            </li>
          </ul>
        
    </>
  );
}
