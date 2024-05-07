//import logo from './logo.svg';
import "./App.css";
//import Custom from "./Custom.js";
import Child from "./components/Child.js";
import React,{createContext} from 'react';
import SuperChild from "./components/SuperChild.js";

export const GolbalInfo = createContext();
function App() {
  const[color,setColor]=React.useState("green");
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header> */}
      {/* <Custom/> */}
      <GolbalInfo.Provider value={{appColor:color}}>
      <h1>Parent Component</h1>
      <Child />
      <SuperChild/>
      </GolbalInfo.Provider>
    </div>
  );
}

export default App;
