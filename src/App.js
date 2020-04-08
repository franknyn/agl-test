import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://agl-developer-test.azurewebsites.net/people.json';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_URL);
      setData(result.data);
    };
    fetchData();
  }, []);

  const getPets = (ownerGender, petType) => {
    let pets = data
      .filter((owner) => owner.gender === ownerGender)
      .map((owner) =>
        owner.pets
          ? owner.pets
              .filter((pet) => pet.type === petType)
              .map((pet) => pet.name)
          : []
      );
    pets = [].concat(...pets);
    return pets.sort();
  };
  return (
    <div className="App">
      <header className="App-body">
        <strong>Male</strong>
        <ul>
          {data &&
            getPets('Male', 'Cat').map((pet, index) => (
              <li key={`cat${index}`}>{pet}</li>
            ))}
        </ul>
        <strong>Female</strong>
        <ul>
          {data &&
            getPets('Female', 'Cat').map((pet, index) => (
              <li key={`cat${index}`}>{pet}</li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
