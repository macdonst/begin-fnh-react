import React, { useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { Flex, Heading, View } from "@adobe/react-spectrum";
import { renderEmptyState } from "../utils";
import Link from "../components/Link";
import {
  TableView,
  TableHeader,
  TableBody,
  Cell,
  Column,
  Row,
} from "@react-spectrum/table";
import AddDialog from "../components/AddDialog";
import DeleteDialog from "../components/DeleteDialog";

const Players = (props) => {
  const { path } = useRouteMatch();
  const [players, setPlayers] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const fetchData = async () => {
    try {
      let data = await (await fetch("/players")).json();
      data = data.sort((a, b) => (a.name <= b.name ? -1 : 1));
      setPlayers(data);
    } catch (err) {
      setPlayers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSelection = (selection) => {
    setSelectedKeys(selection);
  };

  return (
    <View>
      <Heading level="2">Players</Heading>
      <Route exact path="/players">
        <Flex
          direction="row"
          justifyContent="end"
          marginBottom="size-100"
          gap="size-100"
        >
          <AddDialog
            route="/players"
            type="player"
            fields={[
              {
                label: "Name",
                placeholder: "Guy Incognito",
                type: "name",
              },
              {
                label: "Email",
                placeholder: "fake_email@gmail.com",
                type: "date",
              },
              { label: "Goalie", placeholder: "false", type: "goalie" },
              { label: "Full Time", placeholder: "true", type: "fullTime" },
            ]}
            callback={fetchData}
          />
          <DeleteDialog
            route="/players"
            type="player"
            keys={selectedKeys}
            data={players}
            callback={fetchData}
          />
        </Flex>
        <TableView
          aria-label="Table of hockey players"
          width="100%"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={(selection) => updateSelection(selection)}
          renderEmptyState={renderEmptyState}
        >
          <TableHeader>
            <Column key="name" align="start">
              Name
            </Column>
            <Column key="email" align="start">
              Email
            </Column>
            <Column key="goalie" align="center">
              Goalie
            </Column>
            <Column key="fullTime" align="center">
              Full Time
            </Column>
          </TableHeader>
          <TableBody items={players}>
            {(item) => (
              <Row>
                {(columnKey) => {
                  let cell = null;
                  if (columnKey === "name") {
                    cell = (
                      <Link to={`${path}/${item.key}`}>{item[columnKey]}</Link>
                    );
                  } else if (
                    columnKey === "goalie" ||
                    columnKey === "fullTime"
                  ) {
                    cell = item[columnKey] ? "✅" : "❌";
                  } else {
                    cell = item[columnKey];
                  }
                  return <Cell>{cell}</Cell>;
                }}
              </Row>
            )}
          </TableBody>
        </TableView>
      </Route>
    </View>
  );
};
export default Players;
