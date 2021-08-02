import React, { useEffect, useState } from "react";
import {
  Heading,
  View,
  IllustratedMessage,
  Content,
} from "@adobe/react-spectrum";
import {
  TableView,
  TableHeader,
  TableBody,
  Cell,
  Column,
  Row,
} from "@react-spectrum/table";
import { Link, Route, useRouteMatch } from "react-router-dom";

import AddGameDialog from "../AddGameDialog";
import GamePanel from "../GamePanel";

let columns = [
  { name: "Date", uid: "date" },
  { name: "Time", uid: "time" },
  { name: "Facility", uid: "facility" },
];

const renderEmptyState = () => {
  return (
    <IllustratedMessage>
      <Heading>No results</Heading>
      <Content>No results found</Content>
    </IllustratedMessage>
  );
};

const Games = (props) => {
  const { path } = useRouteMatch();
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    try {
      let data = await (await fetch("/games")).json();
      data = data.sort((a, b) => (a.date <= b.date ? -1 : 1));
      setGames(data);
    } catch (err) {
      setGames([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Route exact path="/games">
        <Heading level="1">Games</Heading>
        <AddGameDialog callback={fetchData} />
        <TableView
          aria-label="Example table with dynamic content"
          width="100%"
          renderEmptyState={renderEmptyState}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <Column
                key={column.uid}
                align="start"
                width={column.uid !== "facility" ? "20%" : "60%"}
              >
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={games}>
            {(item) => (
              <Row>
                {(columnKey) => (
                  <Cell>
                    {columnKey === "date" ? (
                      <Link to={`${path}/${item.key}`}>{item[columnKey]}</Link>
                    ) : (
                      item[columnKey]
                    )}
                  </Cell>
                )}
              </Row>
            )}
          </TableBody>
        </TableView>
      </Route>
      <Route path="/games/:gameId">
        <GamePanel games={games} />
      </Route>
    </View>
  );
};
export default Games;
