import React from 'react';
import axios from 'axios';
export default function Home(){
    
    const dataUrl="http://localhost:3000/users";

    const [data,setData]=React.useState([]);

    const fetchData=async ()=>{
       const response=await axios.get(dataUrl);
       setData(response.data);
    }

    React.useEffect(()=>{
        fetchData(dataUrl)
    },[]);
    return (
        <>
          <table class="table table-striped" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>
    {data && data.map(item=>(
        <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
    </tr>
    ))}
  </tbody>
</table>
        </>
    )
}