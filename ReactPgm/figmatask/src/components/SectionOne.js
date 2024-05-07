import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import { faEye, faHeart,faStar } from "@fortawesome/free-solid-svg-icons";

export default function SectionOne(isDarkMode ){
    const buttonContainer = {
        display: "flex",
        alignItems: "center",
      };
    
      const buttonStyle = {
        backgroundColor: "#DB4444",
        color: "white",
        padding: "8px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "8px",
        height: "35px",
      };
    
      const featuredTextStyle = {
        color: "#DB4444",
        fontWeight: "bold",
        textAlign: "center",
        margin: 0,
        lineHeight: "35px",
      };
    
      

  const arrowContainerStyle = {
    display: "flex",
    alignItems: "center",
    background: "#e6e6e6",
    borderRadius: "50%",
    padding: "8px",
    marginRight: "8px",
    marginLeft: "8px",
    height: "40px",
    width: "40px",
  };

  const arrowStyle = {
    fontSize: "24px",
    color: "#333333",
    cursor: "pointer",
  };

  const starRatingStyle = {
    color: "#FFD700", 
    marginRight: "4px",
  };
  
  const cardContentStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    textAlign:"left",
  };

  const pricesContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline", 
  };

    return(
        <>
            <div style={buttonContainer}>
        <button style={buttonStyle}></button>
        <p style={featuredTextStyle}>Categories</p>
      </div>
      <br />
      <div style={buttonContainer}>
        <h4
          style={{
            textAlign: "left",
            fontWeight: "bold",
            flex: 1,
          }}
        >
         Flash Sales
        </h4>

        <div style={arrowContainerStyle}>
          <FontAwesomeIcon icon={faArrowLeft} style={arrowStyle} />
        </div>
        
        <div style={arrowContainerStyle}>
          <FontAwesomeIcon icon={faArrowRight} style={arrowStyle} />
        </div>
      </div>
      
      <br></br>
      <MDBContainer fluid className="my-5">
      <MDBRow>
        <MDBCol md="12" lg="3" className="mb-4">
          <MDBCard>
            <div className="d-flex justify-content-between p-3">
              
              <div className="d-flex flex-column gap-2">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
            <MDBCardImage
              src="images/Sales1.png"
              position="top"
              alt="Laptop"
            />
            <MDBCardBody style={cardContentStyle}>
                <div>
                  <p className="lead mb-0" style={{fontWeight:"bold"}}>HAVIT HV G92 GamePad</p>
                  <div style={pricesContainerStyle}>
                  <span style={{ color: "#DB4444" }}>$260</span>
                  <p className="small text-muted">
                      <s>$360</s>
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                  <div>
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} style={starRatingStyle} />
                    ))}
                  </div>
                  <p style={{ marginLeft: '5px', marginBottom: '0' ,color:"grey"}}>(65)</p>
                  </div>
                </div>
                
                
              </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="12" lg="3" className="mb-4">
          <MDBCard>
            <div className="d-flex justify-content-between p-3">
              
              <div className="d-flex flex-column gap-2">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
            <MDBCardImage
              src="images/keyboard.png"
              position="top"
              alt="Laptop"
            />
            <MDBCardBody style={cardContentStyle}>
                <div>
                  <p className="lead mb-0" style={{fontWeight:"bold"}}>AK-900 Wired Keyboard</p>
                  <div style={pricesContainerStyle}>
                  <span style={{ color: "#DB4444" }}>$960</span>
                  <p className="small text-muted">
                      <s>$1160</s>
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                  <div>
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} style={starRatingStyle} />
                    ))}
                  </div>
                  <p style={{ marginLeft: '5px', marginBottom: '0' ,color:"grey"}}>(65)</p>
                  </div>
                </div>
                
                
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12" lg="3" className="mb-4">
          <MDBCard>
            <div className="d-flex justify-content-between p-3">
              
              <div className="d-flex flex-column gap-2">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
            <MDBCardImage
              src="images/tv.png"
              position="top"
              alt="Laptop"
            />
            <MDBCardBody style={cardContentStyle}>
                <div>
                  <p className="lead mb-0" style={{fontWeight:"bold"}}>IPS LCD Gaming Monitor</p>
                  <div style={pricesContainerStyle}>
                  <span style={{ color: "#DB4444" }}>$160</span>
                  <p className="small text-muted">
                      <s>$170</s>
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                  <div>
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} style={starRatingStyle} />
                    ))}
                  </div>
                  <p style={{ marginLeft: '5px', marginBottom: '0' ,color:"grey"}}>(65)</p>
                  </div>
                </div>
                
                
              </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="12" lg="3" className="mb-4">
          <MDBCard>
            <div className="d-flex justify-content-between p-3">
              
              <div className="d-flex flex-column gap-2">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faEye} />
              </div>
            </div>
            <MDBCardImage
              src="images/chair.png"
              position="top"
              alt="Laptop"
            />
            <MDBCardBody style={cardContentStyle}>
                <div>
                  <p className="lead mb-0" style={{fontWeight:"bold"}}>S Series comfort chair</p>
                  <div style={pricesContainerStyle}>
                  <span style={{ color: "#DB4444" }}>$360</span>
                  <p></p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>

                  <div>
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} style={starRatingStyle} />
                    ))}
                  </div>
                  <p style={{ marginLeft: '5px', marginBottom: '0' ,color:"grey"}}>(65)</p>
                  </div>
                </div>
                
                
              </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
        </>
    )
}