import React from "react";
import { useParams } from "react-router-dom";
import { Heading, View } from "@adobe/react-spectrum";

const PlayerPanel = ({ players }) => {
  const { playerId } = useParams();
  const player = players.find((player) => player.key === playerId);
  return (
    <View>
      <Heading level="2">{player?.name}</Heading>
      <Heading level="3">{player?.email}</Heading>
      <Heading level="3">Goalie: {player?.goalie ? "✅" : "❌"}</Heading>
      <Heading level="3">Full Time: {player?.fullTime ? "✅" : "❌"}</Heading>
    </View>
  );
};

export default PlayerPanel;
