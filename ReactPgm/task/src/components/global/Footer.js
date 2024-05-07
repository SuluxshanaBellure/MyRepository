import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer(){
    const container={
        width:"200px",
padding:"10px",
display:"inline"
    }
    const one={
        float:"left",
fontSize:"25px",
    }
    const two={
        float:"left",

    }
    const three={
        float:"left",

    }
    return(
        <div style={{textAlign:"center"}}>
            <div style={container}>
            <p style={{display:"inline"}}>Conditions of use & sale</p>
            <p style={{display:"inline"}}>Privacy Notice</p>
            
            <p style={{display:"inline"}}>Interest based ads</p>
            </div>
           <FontAwesomeIcon icon={faCopyright} /><p>1996-2024,Amazon.com,Inc. or its Affiliates</p>
        </div>
    )
}