import React from "react";
import UserDisplay from "./UsersDisplay";

const Users = () => {
  const users = [
    { name: 'suluxshana', age: 22, email: 'suluxshana@gmail.com', address: 'hyd' },
    { name: 'geethanjali', age: 24, email: 'geethanjali@gmail.com', address: 'hyd' },
    { name: 'eujun', age: 25, email: 'eujun@gmail.com', address: 'USA' },
    { name: 'lejin', age: 21, email: 'lejin@gmail.com', address: 'hyd' },
    { name: 'swee', age: 22, email: 'swee@gmail.com', address: 'Uk' },
  ];
  // console.log("===================users================="); 
  // console.log(users); 


  return (
    <div className="users">
      <UserDisplay users={users} />
    </div>
  );
};

export default Users;
