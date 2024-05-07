import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import SideBarData from './SideBarData';
import  './sidebar.css';
const SideBar = () => {
  const sidebarData = SideBarData();

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'black',
    fontFamily: 'Comic Sans MS, Comic Sans, cursive',
  };

  const arrowStyle = {
    marginLeft: '5px', 
    cursor: 'pointer',
  };

  const subItemStyle = {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#43b0ac',
    paddingLeft: '15px',
    cursor: 'pointer',
  };

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleTitleClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setActiveItem(null); 
  };

  const handleDropdownClick = (link) => {
    window.location.pathname = link;
  };

  return (
    <div className="sidebar" style={{ textAlign: 'left' }}>
      <ul style={{ listStyleType: 'none' }}>
        {sidebarData.map((item, index) => (
          <li
            key={index}
            className={activeItem === index ? 'active' : ''}
          >
            <div onClick={() => handleTitleClick(index)}>
              <span
                style={titleStyle}
                onClick={() => setActiveItem(index)}
              >
                {item.title}
                {item.dropdownItems && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={arrowStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTitleClick(index);
                    }}
                  />
                )}
              </span>
            </div>
            {item.dropdownItems && expandedIndex === index && (
              <ul className="dropdown" style={{ listStyleType: 'none' }}>
                {item.dropdownItems.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => handleDropdownClick(subItem.link)}
                    style={subItemStyle}
                  >
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
