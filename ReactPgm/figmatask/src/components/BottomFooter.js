import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShippingFast, faHeadset, faCertificate } from "@fortawesome/free-solid-svg-icons";

export default function BottomFooter() {

    const container = {
        paddingRight: "100px",
        paddingLeft: "100px",
    };

    const columnStyle = {
        width: "150px",  
    };

    const outerCircle = {
        borderRadius: "50%",
        backgroundColor: "#dee0e3",
        width: "40px",  
        height: "40px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginLeft: "145px",
    };

    const innerCircle = {
        borderRadius: "50%",
        backgroundColor: "black",
        width: "70%",  
        height: "70%", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    };

    const firstParagraphStyle = {
        fontWeight: "bold",  
        marginBottom: "8px",
        marginTop: "0", 
    };

    const paragraphStyle = {
        margin: "0", 
    };

    return (
        <div style={container}>
            <div className="row">
                <div className="col-sm" style={columnStyle}>
                    <div style={outerCircle}>
                        <div style={innerCircle}>
                            <FontAwesomeIcon icon={faShippingFast} />
                        </div>
                    </div>
                    <p style={firstParagraphStyle}>FREE AND FAST DELIVERY</p>
                    <p style={paragraphStyle}>Free delivery for all orders over $140</p>
                </div>
                <div className="col-sm" style={columnStyle}>
                    <div style={outerCircle}>
                        <div style={innerCircle}>
                            <FontAwesomeIcon icon={faHeadset} />
                        </div>
                    </div>
                    <p style={firstParagraphStyle}>24/7 CUSTOMER SUPPORT</p>
                    <p style={paragraphStyle}>Friendly 24/7 customer support</p>
                </div>
                <div className="col-sm" style={columnStyle}>
                    <div style={outerCircle}>
                        <div style={innerCircle}>
                            <FontAwesomeIcon icon={faCertificate} />
                        </div>
                    </div>
                    <p style={firstParagraphStyle}>MONEY BACK GUARANTEE</p>
                    <p style={paragraphStyle}>We return money within 30 days</p>
                </div>
            </div>
        </div>
    );
}
