import { useMenuContext } from "./MenuProvider";

const MenuCounter =()=>{

    const {meals}=useMenuContext();
    return (
        <>
          <h5>No.of meals {meals.length}</h5>
        </>
    )
}

export default MenuCounter;