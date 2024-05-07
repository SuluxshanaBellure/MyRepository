import React from 'react';

const Refs = () => {
//   const [name, setName] = React.useState('');

//   const handleInputChange = (e) => {
//     setName(e.target.value);
//     console.log(e.target.value);
//   };


// const nameRef=React.useRef('');

// React.useEffect(() => {
//     console.log(nameRef.current.value,"name");
//   }, [nameRef]);

//   return (
//     <>
//       <h4>Add a hotel:</h4>
//       <input
//         type="text"
//         value={name}
//         placeholder="Enter hotel name"
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
        
//         placeholder="Enter hotel name"
//         ref={nameRef}
//       />

//  const [count,setCount]=React.useState(0);

//  const countRef=React.useRef(0);

//  React.useEffect(()=>{
//     countRef.current=countRef.current+1;
 
//  },[count])

//    return(
//     <>
//     <p>Count : {countRef.current}</p>
//     {/* <button onClick={()=>setCount(count+1)}>Increment</button> */}
//     <button onClick={() => setCount(count + 1)}>Increment</button>
//     </>
//    )

const inputRef=React.useRef();

React.useEffect(()=>{
    inputRef.current.focus();
    inputRef.current.style.backgroundColor="yellow";
},[])


const [count,setCount]=React.useState(0);

const countRef=React.useRef(0);

  return(
    <>
     <input type="text" ref={inputRef}/>
     <p>**********************</p>
    <p>Count : {countRef.current}</p>
     <button onClick={()=>setCount(countRef.current=countRef.current+1)}>Increment</button>
     <button onClick={()=>setCount(countRef.current=countRef.current-1)}>Decrement</button>
    </>
  )

};

export default Refs;
