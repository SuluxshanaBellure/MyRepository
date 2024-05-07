import  '../custom.css';
import logo from '../meta.png'; 


export default function Footer(){
    return(
        <>
<footer style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} className="container py-5">
  <div className="row" style={{textAlign:'left'}}>
    <div className="col-12 col-md">
    <img src={logo} alt="Logo" />Meta Open Source     
     <small className="d-block mb-3 text-muted">&copy; 2023</small>
    </div>
    <div className="col-6 col-md">
      <h5>Learn React</h5>
      <ul className="list-unstyled text-small">
        <li>Quick Start</li>
        <li>Installation</li>
        <li>Describing the UI</li>
        <li>Adding Interactivity</li>
        <li>Managing State</li>
        <li>Escape Hatches</li>
      </ul>
    </div>
    <div className="col-6 col-md">
      <h5>API Reference</h5>
      <ul className="list-unstyled text-small">
        <li>React APIs</li>
        <li>React DOM APIs</li>
      </ul>
    </div>
    <div className="col-6 col-md">
      <h5>Community</h5>
      <ul className="list-unstyled text-small">
        <li> Code of Conduct</li>
        <li> Meet the team</li>
        <li> Docs Contributors</li>
        <li> Acknowledgemnets</li>
      </ul>
    </div>
    <div className="col-6 col-md">
      <h5>More</h5>
      <ul className="list-unstyled text-small">
        <li> Blog </li>
        <li> React Native </li>
        <li> Privacy </li>
        <li> Terms </li>
      </ul>
    </div>
  </div>
</footer>
        </>
    )
}