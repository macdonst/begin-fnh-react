import React, { useEffect, useState } from "react";
import {
  ActionGroup,
  Heading,
  View,
  Item,
  Text,
  Flex,
} from "@adobe/react-spectrum";
import {
  TableView,
  TableHeader,
  TableBody,
  Cell,
  Column,
  Row,
} from "@react-spectrum/table";
import { Route, useRouteMatch } from "react-router-dom";
import Draw from "@spectrum-icons/workflow/Draw";

import AddGameDialog from "../AddGameDialog";
import DeleteGameDialog from "../DeleteGameDialog";
import GamePanel from "../GamePanel";
import Link from "./Link";
import { renderEmptyState } from "../utils";

const Games = (props) => {
  const { path } = useRouteMatch();
  const [games, setGames] = useState([]);
  let [selectedKeys, setSelectedKeys] = useState(new Set([]));
  let [disabledKeys, setDisabledKeys] = useState([["edit", "delete"]]);

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

  const updateSelection = (selection) => {
    setSelectedKeys(selection);
    let keys = selection.size > 0 ? [] : ["edit", "delete"];
    setDisabledKeys(keys);
  };

  return (
    <View>
      <Route exact path="/games">
        <Heading level="2">Games</Heading>
        <Flex
          direction="row"
          justifyContent="end"
          marginBottom="size-100"
          gap="size-100"
        >
          <AddGameDialog callback={fetchData} />
          <ActionGroup disabledKeys={disabledKeys}>
            <Item key="edit">
              <Draw />
              <Text>Edit</Text>
            </Item>
          </ActionGroup>
          <DeleteGameDialog
            keys={selectedKeys}
            games={games}
            callback={fetchData}
          />
        </Flex>
        <TableView
          aria-label="Table of hockey games"
          width="100%"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(selection) => updateSelection(selection)}
          renderEmptyState={renderEmptyState}
        >
          <TableHeader>
            <Column key="date" align="start">
              Date
            </Column>
            <Column key="time" align="start">
              Time
            </Column>
            <Column key="facility" align="start">
              Facility
            </Column>
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
