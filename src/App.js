import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = await (await fetch("/games")).json();
        setGames(data);
      } catch (err) {
        setGames([]);
      }
    }
    fetchData();
  }, []);

  let gamesList = (
    <ul>
      {games.map((game) => (
        <li key={game.date}>{game.date}</li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {gamesList}
        <p>Change me!</p>
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
};

export default App;
