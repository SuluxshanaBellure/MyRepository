import React,{useState} from 'react';

export default function TextForm(props) {


    const handleOnChange=(event)=>{
        console.log(" on change" );
        setText(event.target.value);
       }


   const[text, setText]=useState("Enter default value");
   //setText("New text");


   const handleOnClick=()=>{
    console.log("Button is clicked !" + text);
    let newText=text.toUpperCase();
    setText(newText);
   }

  return (
    <div>
        
            <h2>{props.heading}</h2>
  <div className="form-group">
    {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
    <textarea className="form-control" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="6"></textarea>
  </div>
  <button className='btn btn-primary' onClick={handleOnClick} >Convert to upper case</button>
 {/* <button className='btn btn-primary'  onChange={handleOnChange}>Convert to upper case</button> */}

    </div>
  )
}
