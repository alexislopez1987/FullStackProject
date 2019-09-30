import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    console.log("inicio ajax");
  
    fetch("http://app:49160/api/v1/item")
    .then(res => res.json())
    .then(
      (result) => {
        console.log("respuesta ajax");
        console.log(result);
      },
      (error) => {
        console.error(error);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
