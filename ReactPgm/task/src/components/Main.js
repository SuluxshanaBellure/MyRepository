import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Navigation from './Navigation';
import PageRouting from './pages/PageRouting';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './global/Header';


export default function Main(){
    return(
        
            <Router>
    
    
   <Navigation/>
        <PageRouting/>
      </Router>
        
    )
}