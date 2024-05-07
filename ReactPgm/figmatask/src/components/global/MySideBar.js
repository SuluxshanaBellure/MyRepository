import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SideImage from '../SideImage';

export default function MySideBar(){
    return(
      <div style={{paddingTop:"100px",}}>
        <div style={{width:"30%"}}>
           <Sidebar>
  <Menu>
    <SubMenu label="Women's Fashion">
     
    </SubMenu>
    <SubMenu label="Men's Fashion">
      
    </SubMenu>
    <MenuItem> Electronics </MenuItem>
    <MenuItem> Home & Lifestyle </MenuItem>
    <MenuItem> Medicines </MenuItem>
    <MenuItem> Sports & Outdoor </MenuItem>
    <MenuItem> Baby's & Toys </MenuItem>
    <MenuItem> Groceries & Pets </MenuItem>
    <MenuItem> Health & Beauty </MenuItem>

  </Menu>
</Sidebar></div>
{/* <div style={{width:"30%"}}>
  <SideImage />
</div> */}

        </div>
    )
}