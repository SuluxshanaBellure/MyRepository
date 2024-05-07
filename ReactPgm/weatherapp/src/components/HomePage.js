import 'bootstrap/dist/css/bootstrap.min.css';
import "./homepage.css";
import { NavLink } from 'react-router-dom';

export default function HomePage(){
    return (
        <>
           <ul className="nav justify-content-end">
  <li className="nav-item"
  >
      <NavLink className="nav-link" to=" ">Home</NavLink>
  </li>
  <li className="nav-item">
  <NavLink className="nav-link" to="/plp">Plp</NavLink>
  </li>

  <li className="nav-item">
  <NavLink className="nav-link" to=" ">Plp</NavLink>
  </li>
  
</ul>
        </>
    )
}