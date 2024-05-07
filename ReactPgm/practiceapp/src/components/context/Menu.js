import React from "react";
import { useMenuContext } from "./MenuProvider";

const MenuDisplay = () => {
  const { meals, handleClick, deleteItem } = useMenuContext();

  return (
    <div>
      <div>
        <button className="btn btn-success" onClick={handleClick}>Add Items</button>
      </div>

      {meals.map((meal) => (
        <div key={meal.id}>
          <h2>{meal.id}-{meal.item} <button className="btn btn-danger" onClick={() => deleteItem(meal.id)}>Delete</button></h2>
        </div>
      ))}
    </div>
  );
};

export default MenuDisplay;
