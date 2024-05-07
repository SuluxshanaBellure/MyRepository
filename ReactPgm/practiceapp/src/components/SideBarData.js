import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function SideBarData() {
  return [
    {
      title: "Quick start",
    //   icon: <FontAwesomeIcon icon={faHouse} />,
      link: "/learn",
      dropdownItems: [
        {
          title: 'Tic-Tac-Toe',
          link: '',
        },
        {
            title: 'Thinking in React',
            link: '',
          },
        
      ],
    },
    {
        title: "Installation",
      //   icon: <FontAwesomeIcon icon={faHouse} />,
        link: "/learn",
        dropdownItems: [
          {
            title: 'Start a new react Project',
            link: '/createproject',
          },
          {
            title: 'Add react to an existing project',
            link: '',
          },
          
        ],
      },
  ];
}
