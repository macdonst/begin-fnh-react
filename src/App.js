import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

import Navbar from "./Navbar";
import Games from "./pages/Games";
import Players from "./pages/Players";
import Financials from "./pages/Financials";

const App = () => {
  return (
    <Router>
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
          <View backgroundColor="gray-300" gridArea="nav">
            <Flex
              direction={{ base: "row", M: "column" }}
              gap="size-100"
              margin="size-100"
            >
              <Navbar />
            </Flex>
          </View>
          <View
            gridArea="content"
            minHeight="size-4600"
            paddingStart="size-675"
            paddingEnd="size-675"
            paddingTop="size-500"
            paddingBottom="size-500"
            elementType="main"
          >
            <Switch>
              <Route exact path="/games" component={Games} />
              <Route exact path="/games/:gameId" component={Games} />
              <Route exact path="/players" component={Players} />
              <Route exact path="/Players/:playerId" component={Players} />
              <Route exact path="/financials" component={Financials} />
            </Switch>
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
              <Text>
                Copyright © 2021 Simon MacDonald. All rights reserved.
              </Text>
            </footer>
          </View>
        </Grid>
      </Provider>
    </Router>
  );
};

export default App;
