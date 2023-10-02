import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then(
        res =>  res.json()
      )
      .then(
        data => {
          setData(data)
          console.log(data)
        }
      )
      
  }, []); 

  return (
    <div>
      {
       (typeof data.members =='undefined')
      ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
