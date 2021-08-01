import React, { useEffect, useState } from "react";
import { Heading, View } from "@adobe/react-spectrum";
import { Link, Route, useRouteMatch } from "react-router-dom";

import GamePanel from "../GamePanel";

const Games = (props) => {
  const { path } = useRouteMatch();
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    try {
      let data = await (await fetch("/games")).json();
      setGames(data);
    } catch (err) {
      setGames([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let gamesList = (
    <ul>
      {games.map((game) => (
        <li key={game.date}>
          <Link to={`${path}/${game.key}`}>{game.date}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <View>
      <Route exact path="/games">
        <Heading level="1">Games</Heading>
        {gamesList}
      </Route>
      <Route path="/games/:gameId">
        <GamePanel games={games} />
      </Route>
    </View>
  );
};
export default Games;
