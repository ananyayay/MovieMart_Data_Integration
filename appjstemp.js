import React,{useState , useEffect} from "react";
import './App.css';

function App() {

  const[data, setData] = useState([{}])

  
  useEffect(() => {
    fetch('/members') // Replace with your route
      .then(
        response =>  response.json()
      )
      .then(
        data => {
          setData(data)
          console.log(data)
        }
      )
      
  }, []); 

  return (
    <div className="App">
      { (typeof data.members =='undefined') ? (
        <p>Loading... yep</p>
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