import React, { createContext, useState } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  
  const inputStyle ={
    border:"1px solid grey",
    borderRadius:"15px",
    height: "40px",
    textAlign:"center",
  }
  const [meals, setMeals] = useState([
    { id: 1, item: "Potato chips" },
    { id: 2, item: "Baked pasta" },
    { id: 3, item: "Maggi" },
  ]);

  const [newItem, setNewItem] = useState(""); 

  const handleClick = () => {
    const existingIds = meals.map((meal) => meal.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    if (newItem.trim() !== "") {
      const newItemObject = { id: newId, item: newItem };
      setMeals((current) => [...current, newItemObject]);
      setNewItem("");
    } else {
      alert("Please enter a valid item");
    }
  };

  const deleteItem = (id) => {
    setMeals((current) => current.filter((meal) => meal.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        meals,
        handleClick,
        deleteItem,
        newItem,
        setNewItem,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >

        <h4>Please enter the item you want to see in our menu : </h4>
        <input
        style={inputStyle}
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
        />
        <button className="btn btn-primary" type="submit">Add Item</button>
      </form>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => React.useContext(MenuContext);

export default MenuProvider;
