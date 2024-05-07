import CallBack from "./CallBack";
import React from "react";

const Parent=()=>{

    const [items, setItems] = React.useState([]);

    const[count,setCount]=React.useState(0);
    // const addItem = () => {
    //     setItems((prev) => [...prev, "new item"]);
        
    //   };
    const addItem=React.useCallback(()=>{
        setItems((prev) => [...prev, "new item"]);
        
    },[items]);
    return(
        <>
          <CallBack items={items} addItem={addItem}/>
         <p> Count : {count}</p>
         <button onClick={()=>setCount(count+1)}>Increase</button>
        </>
    )
}
export default Parent;