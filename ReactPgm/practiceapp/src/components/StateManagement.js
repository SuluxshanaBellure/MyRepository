import React from "react";
import Numbers from "./Numbers";

const StateManagement = () => {
  const [count, setCount] = React.useState(0);

  const IncreaseCount = () => {
    setCount(count + 1);
  };

  const DecreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <>
      <p>clicked {count} times</p>
      <button
        className="btn btn-primary"
        onClick={IncreaseCount}
        style={{ marginRight: "5px" }}
      >
        Increase
      </button>
      <button
        className="btn btn-primary"
        onClick={DecreaseCount}
        disabled={count === 0}
      >
        Decrease
      </button>
      <br></br>
      <br></br>
      <Numbers />
    </>
  );
};

export default StateManagement;
