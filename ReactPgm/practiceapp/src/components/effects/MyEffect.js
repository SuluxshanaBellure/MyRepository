import React,{useRef}from "react";

const MyEffect = () => {
  const [count, setCount] = React.useState(0);
  const handeClick = () => {
    setCount(count+1);
  };

  const[name,setName]=React.useState("TechD");
  const refElement=useRef("");
  console.log(refElement);
  React.useEffect(
    ()=>{alert("Button is clicked!");},
    [count]
  );
  return (
    <>
      <p>Clicked {count} times</p>
      <button onClick={handeClick}>Click Me</button>

      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>      
    </>
  );
};

export default MyEffect;
