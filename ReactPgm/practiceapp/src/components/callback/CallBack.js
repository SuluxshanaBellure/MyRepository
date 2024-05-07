import React from "react";

const CallBack = ({addItem,items}) => {
    console.log("ing");
  return (
    <>
      {Array.isArray(items) && items.map((item, index) => (
        <p key={index}> {item + index} </p>
      ))}

      <button onClick={addItem}>Add item</button>
    </>
  );
};
export default CallBack;
