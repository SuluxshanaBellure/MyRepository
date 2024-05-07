import axios from "axios";
import React from "react";

export default function Create() {
  const [postData, setPostData] = React.useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setPostData({
      ...postData,
      [e.target.name]: value
    });
  };

  const inputSubmit = () => {
    const userData = {
      name: postData.name,
      email: postData.email,
      phone: postData.phone
    };

    axios.post("http://localhost:3000/users", userData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <>
      <input type="text" placeholder="name" value={postData.name} onChange={handleChange}></input>
      <input type="text" placeholder="email" value={postData.email} onChange={handleChange}></input>
      <input type="text" placeholder="phone" value={postData.phone} onChange={handleChange}></input>
      <button onClick={inputSubmit}>Submit</button>
    </>
  );
}
