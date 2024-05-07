import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';
import TextForm from './components/TextForm.js';

export default function Custom(){
    return (
        <>
          <Navbar title="textUtils" Disabled="Enabled"/>
          <div className='container'>
          <TextForm heading="Please fill the text area.....!"/>
          </div>
          
        </>
    );
}