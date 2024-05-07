import React from 'react';
import axios from 'axios';

export default function AxiosCall(){

    const[data,setData]=React.useState([]);
    const[isError,setIsError]=React.useState("");
    React.useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res)=>setData(res.data))
        .catch((error)=>setIsError(error.message));
    },[]);
    return (
        <>
        {isError!="" & <h3>{isError}</h3>}
           <h5>AXIOS</h5>
           <ul>
            {data.map(item=>(
                <li key={item.id}>{item.id}-{item.body}</li>
            ))}
            </ul>
        </>
    )
}