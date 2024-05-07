import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage} from "@fortawesome/free-solid-svg-icons";
//   import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer(){
    const inputStyle={
        backgroundColor:"black",
        color:"grey",
        border:"1px solid #A8A8A8",
        borderRadius:"4px",
        padding:"4px",
        
    };
    return(
        <div>
          <MDBFooter style={{ backgroundColor: 'black',color: 'white' }} className='text-center text-lg-start text-muted'>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3' style={{paddingTop: "70px",}}>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4' style={{textAlign:"left"}}>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
               Exclusive
              </h6>
              <p>
                Subscribe
              </p>
              <p>
                Get 10% off your first order
                
              </p><input style={inputStyle} placeholder='Enter your email'/>
              {/* <FontAwesomeIcon style={{paddingLeft: "7px",}} icon={faMessage} /> */}
              <img style={{marginLeft: "-28px",}} src="images/icon-send.png"/>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4' style={{textAlign:"left"}}>
              <h6 className='text-uppercase fw-bold mb-4'>Support</h6>
              <p>
                <a href='#!' className='text-reset'>
                  111 Bijay Saroni,Dhaka DH 1515,Bangladesh
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Exclusive@gmail.com
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 +88015-88888-9999
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4' style={{textAlign:"left"}}>
              <h6 className='text-uppercase fw-bold mb-4'>Account</h6>
              <p>
                <a href='#!' className='text-reset'>
                  My Account
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Login/Register
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cart
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Wishlist
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Shop
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4' style={{textAlign:"left"}}>
              <h6 className='text-uppercase fw-bold mb-4'>Quick Link</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Privacy Policy
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Terms of Use
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 
                FAQ
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> 
                Contact
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4' style={{textAlign:"left"}}>
              <h6 className='text-uppercase fw-bold mb-4'>Support</h6>
              <p>
                <a href='#!' className='text-reset'>
                  111 Bijay Saroni,Dhaka DH 1515,Bangladesh
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Exclusive@gmail.com
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 +88015-88888-9999
                </a>
              </p>
              {/* <FontAwesomeIcon icon={faFacebook} /> */}
              {/* <FontAwesomeIcon icon="fa-brands fa-instagram" /> */}
                                        </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <hr style={{ borderColor:'#FFFFFF', marginBottom: '0px'}} />
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
        </div>
    )
}