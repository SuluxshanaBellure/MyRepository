import Footer from './Footer.js';
import Header from './Header.js';
import TopHeader from './TopHeader.js';
import { BrowserRouter as Router} from 'react-router-dom';
import Page from '../pages/Page.js';

function Main(){
    return(
        <>
        <Router>

       
        <TopHeader></TopHeader>
        <Header></Header>

        <Page/>
         
        
        <Footer></Footer>
        </Router>
        </> 
    )
}

export default Main;