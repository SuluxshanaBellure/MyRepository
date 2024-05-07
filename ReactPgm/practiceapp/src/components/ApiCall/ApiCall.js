import React from "react";

const ApiCall = () => {

    const apiUrl = "https://jsonplaceholder.typicode.com/posts";

    
  const [data, setData] = React.useState([]);
  const [newData, setNewData] = React.useState([
    {
      userId: 10,
      id: 105,
      title: "at nam consequatur ea labore ea harum",
      body: "cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut",
    },
  ]);

  const fetchApiData = async (url) => {
    try {
      const response = await fetch(url);
      const apiData = await response.json();
      
      setData([...apiData,...newData]);
      console.log(apiData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchApiData(apiUrl);
  }, []);

  return (
    <>
      <ul>
        <h4>Posts</h4>
        {data.map(item => (
          <li key={item.id}>
            {item.id}-{item.body}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ApiCall;
