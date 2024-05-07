import React, { useState } from "react";

const UserDisplay = ({ users }) => {
  
  const [selectedUser, setSelectedUser] = useState(null);

  const displayUserDetails = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-display">
      {/* Displaying the user information in ths user page */}
      <h2>User Information</h2>
      <table
        className="table table-bordered table-striped"
        style={{ width: "600px", margin: "0 auto" }}
      >
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => displayUserDetails(user)}
                >
                  Info
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Returning the modal */}
      {selectedUser && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Name: {selectedUser.name}</p>
                <p>Age: {selectedUser.age}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Address: {selectedUser.address}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDisplay;
