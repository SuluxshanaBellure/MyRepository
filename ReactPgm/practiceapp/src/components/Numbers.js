import React from 'react';

const Numbers = () => {
  const [numbers, setNumbers] = React.useState(['1', '2']);

  const addNumber = () => {
    setNumbers([...numbers, `Number ${numbers.length + 1}`]);
  };

  const deleteNumber =(index)=>{
    setNumbers(numbers.filter((_, i) => i !== index));
  }
  return (
    <>
      <h3>Numbers:</h3>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}
          <button className='btn btn-info' onClick={()=>deleteNumber(index)}>Delete number</button></li>
        ))} 
      </ul>
      <button className='btn btn-info' onClick={addNumber}>Add number</button>
    </>
  );
};

export default Numbers;
