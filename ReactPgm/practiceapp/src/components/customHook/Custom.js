import { useEffect, useState } from "react";
import UseTitle from "./UseTitle";
const Custom=()=>{

    const[count,setCount]=useState(0);
    UseTitle(count);
   
    return (
        <>
           <h4>hiii</h4>
           <button onClick={()=>setCount(count+1)}>Click</button>
        </>
    )
}

export default Custom;