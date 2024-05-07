import bodyimage from '../bodyimage.png';
//import { BrowserRouter as Router} from 'react-router-dom';
//import Page from '../pages/Page.js';

export default function Body(){
    return (
        <>
        <br></br>
        <img src={bodyimage} alt="Logo" />
        <h1 style={{fontSize:'60px'}}>React</h1>
        <p style={{fontSize:'25px',fontFamily: 'Georgia, serif',}}>The library for web and native user interfaces</p>
        <div style={{ paddingLeft:'500px', display: 'flex', gap: '10px'}}>
        <a style={{ borderRadius: '150px' }} href="https://react.dev/learn">
        <button type="button" class="btn btn-primary" style={{borderRadius:'30px',padding:'10px',width:'150px'}}>Learn React</button>
</a>
        <a href="https://react.dev/reference/react">
        <button type="button" class="btn btn-light" style={{borderRadius:'30px',border:'1px solid #ABB7B7',padding:'10px',width:'150px'}}>API Reference</button></a>
        </div>
        <br></br><br></br><br></br>
        <section style={{backgroundColor:'#f5f5ef',height:'400px',paddingTop:'90px'}}>
  <h1 style={{fontSize:'60px'}}>Create user interfaces <br></br>from components</h1><br></br>
  <p style={{fontSize:'25px',fontFamily: 'Georgia, serif',}}>React lets you build user interfaces out of individual pieces called components.<br></br>Create your own React components like Thumbnail, LikeButton, and Video.<br></br> Then combine them into entire screens, pages, and apps.</p>
</section>
        <br></br><br></br>
        
       </>
    )
}