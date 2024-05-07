//import logo from "./logo.svg";
import "./App.css";
import { Main } from "./components/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from "./components/FormPage";
import Header from "./components/Header";

function App() {
  return (
   
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
       {/* <Main /> 
       <FormPage/> */}
       <Header/>
    </div>
    
  );
}

export default App;
