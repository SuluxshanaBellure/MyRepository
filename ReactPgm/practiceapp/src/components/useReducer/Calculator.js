import React from "react";

const initialState = 1;
const reducer = (state, action) => {
  switch (action) {
    case "add":
      return state + 1;
    case "subtract":
      return state - 1;
    case "multiply":
      return state * 2;
    case "divide":
      return state / 1;
    case "reset":
      return 0;
    default:
      alert("Error !");
  }
};
const Calculator = () => {
  const [count, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      <h4>Count : {count}</h4>
      <button onClick={() => dispatch("add")}>Add</button>
      <button onClick={() => dispatch("subtract")}>Subtract</button>
      <button onClick={() => dispatch("multiply")}>Multiply</button>
      <button onClick={() => dispatch("divide")}>Divide</button>
      <button onClick={() => dispatch("reset")}>Reset</button>
    </>
  );
};
export default Calculator;
