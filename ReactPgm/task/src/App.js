import logo from './logo.svg'
import './App.css';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Navigation from './components/Navigation';
import PageRouting from './components/pages/PageRouting';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/global/Header';
import Main from './components/Main';
import Footer from './components/global/Footer';
import Boxed from './components/Boxed';

function App() {
  return (
    <>
    
   <Header/> 
  <Main/>
  <Boxed/>
  <Footer/>
       </>

  );
}

export default App;
