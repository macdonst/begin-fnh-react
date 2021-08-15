import React from "react";
import { useParams } from "react-router-dom";
import { Heading, View } from "@adobe/react-spectrum";

import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const GamePanel = ({ games }) => {
  console.log("Game Pane");

  const { gameId } = useParams();

  console.log("game Id", gameId);

  const game = games.find((game) => game.key === gameId);
  const gameDate = game?.date
    ? dayjs(`${game?.date} ${game?.time}`, "YYYY-MM-DD").format("dddd MMMM D")
    : "";
  return (
    <View>
      <Heading level="2">
        {gameDate} {game?.time}
      </Heading>
      <Heading level="3">{game?.facility}</Heading>
    </View>
  );
};

export default GamePanel;
