import React from "react";
import MenuProvider from "./MenuProvider";
import Menu from "./Menu";
import MenuCounter from "./MenuCounter";

const MenuDisplay = () => {
  return (
    <>
      <MenuProvider>
        <MenuCounter />
        <Menu />
      </MenuProvider>
    </>
  );
};

export default MenuDisplay;
