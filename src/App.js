import React, { useState, useEffect } from "react";
import {
  Provider,
  defaultTheme,
  Grid,
  View,
  Flex,
  Divider,
  Text,
  Heading,
  Link,
} from "@adobe/react-spectrum";

import AddGameDialog from "./AddGameDialog";

const App = () => {
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState(null);

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
          <Link isQuiet onPress={() => setSelected(game.date)}>
            {game.date}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <Provider theme={defaultTheme}>
      <Grid
        areas={{
          base: ["header", "nav", "content", "footer"],
          M: [
            "header   header",
            "nav      content",
            "nav      content",
            "footer   footer",
          ],
          L: [
            "header header  header",
            "nav    content toc",
            "nav    content toc",
            "footer footer  footer",
          ],
        }}
        rows={{
          M: ["size-1000", "1fr", "1fr", "size-500"],
          L: ["size-1000", "1fr", "1fr", "size-500"],
        }}
        columns={{
          M: ["size-2400", "1fr"],
          L: ["size-2400", "1fr", "size-2400"],
        }}
        marginTop="size-100"
        marginBottom="size-100"
        minHeight="100vh"
      >
        <View
          gridArea="header"
          height="size-1000"
          elementType="header"
          borderBottomWidth="thin"
        >
          <Heading level="1" marginStart="size-400" marginEnd="size-400">
            🏒 Friday Night Hockey
          </Heading>
        </View>
        <View backgroundColor="gray-300" gridArea="nav" elementType="nav">
          <Flex
            direction={{ base: "row", M: "column" }}
            gap="size-100"
            margin="size-100"
          >
            <View>
              <Heading>Games</Heading>
              {gamesList}
              <AddGameDialog callback={fetchData} />
            </View>
          </Flex>
        </View>
        <View
          backgroundColor="purple-600"
          gridArea="content"
          minHeight="size-4600"
          paddingStart="size-675"
          paddingEnd="size-675"
          elementType="main"
        >
          {selected}
        </View>
        <View
          backgroundColor="magenta-600"
          gridArea="toc"
          minHeight="size-1000"
          isHidden={{ base: true, L: false }}
        />
        <View
          gridArea="footer"
          height="size-500"
          marginStart="size-400"
          marginEnd="size-400"
        >
          <footer style={{ textAlign: "right", fontSize: "11px" }}>
            <Divider size="S" />
            <Text>Copyright © 2021 Simon MacDonald. All rights reserved.</Text>
          </footer>
        </View>
      </Grid>
    </Provider>
  );
};

export default App;
