import React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";

import { Container, HiroApp, HiroStyle, TopBar } from "./src";

const Test = ({ ready }) => {
  return (
    <HiroApp>
      <HiroStyle
        onLoad={ready}
        theme="portal"
        Button
        Container
        Dropdown
        Header
        Icon
        Image
        Input
        Item
        Loader
        Menu
        Reset
        Search
        Segment
        Site
        Tab
        Transition
      />
      <TopBar
        title="Test Page"
        logo="https://hiro.arago.co/app/images/favicon/android-icon-192x192.png"
        options={[
          { key: "profile", text: "View Profile" },
          { key: "logout", text: "Logout" }
        ]}
        navigation={[
          { href: "/", contents: "Home" },
          { href: "/page1", contents: "Page 1" }
        ]}
        search={[{ key: 1, value: 1, text: 1 }, { key: 2, value: 2, text: 2 }]}
        searchProps={{
          onChange: (_, { value }) => console.log("onChange:", value)
        }}
        color="orange"
      />

      <Route
        path="/"
        component={() => <Container>Hello world</Container>}
        exact
      />
      <Route
        path="/page1"
        component={() => <Container>Hello world 2</Container>}
        exact
      />
    </HiroApp>
  );
};

// Render
const target = document.getElementById("app");

if (!target) {
  throw new Error("Failed to find #app");
}

render(<Test ready={() => console.log("ready!")} />, target);
