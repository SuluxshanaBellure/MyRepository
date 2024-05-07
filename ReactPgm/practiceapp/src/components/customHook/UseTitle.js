import { useEffect } from "react";

const UseTitle=(props)=>{
    useEffect(()=>{
        document.title=props+" hits on button";
    })
 return(
 <>
    <h3>hi</h3>
 </>
 )
}

export default UseTitle;