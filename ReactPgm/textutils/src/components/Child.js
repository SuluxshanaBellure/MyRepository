//import logo from './logo.svg';
//import './App.css';
//import Custom from "./Custom.js";
import React,{useContext} from 'react';
import {GolbalInfo} from '../App.js';
import SuperChild from './SuperChild.js';

function Child() {
    const {appColor}=useContext(GolbalInfo);
    //console.log("App color : ",appColor);
  return (
    <div className="App">
      
      <h3 style={{backgroundColor:appColor}}>Child component</h3>
      {/* <SuperChild/> */}
    </div>
  );
}

export default Child;
