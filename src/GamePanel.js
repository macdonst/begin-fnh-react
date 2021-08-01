import React from "react";
import { Heading, View } from "@adobe/react-spectrum";

import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const GamePanel = ({ selected, games }) => {
  const game = games.find((game) => game.key === selected);
  const gameDate = game?.date
    ? dayjs(`${game?.date} ${game?.time}`, "YYYY-MM-DD").format("dddd MMMM D")
    : "";
  return (
    <View>
      <Heading level="1">
        {gameDate} {game?.time}
      </Heading>
      <Heading level="2">{game?.facility}</Heading>
    </View>
  );
};

export default GamePanel;
