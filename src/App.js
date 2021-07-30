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
} from "@adobe/react-spectrum";

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
        columns={{
          M: ["size-2000", "1fr"],
          L: ["size-2000", "1fr", "size-2000"],
        }}
        gap="size-100"
        margin="size-100"
      >
        <View
          backgroundColor="celery-600"
          gridArea="header"
          height="size-1000"
        />
        <View backgroundColor="gray-300" gridArea="nav" elementType="nav">
          <Flex
            direction={{ base: "row", M: "column" }}
            gap="size-100"
            margin="size-100"
          >
            <View>
              <Heading>Games</Heading>
              {gamesList}
            </View>
          </Flex>
        </View>
        <View
          backgroundColor="purple-600"
          gridArea="content"
          height="size-4600"
        />
        <View
          backgroundColor="magenta-600"
          gridArea="toc"
          minHeight="size-1000"
          isHidden={{ base: true, L: false }}
        />
        <View gridArea="footer" height="size-1000">
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
