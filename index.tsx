import React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";

import { Container, HiroApp, Icon, TopBar } from "./src";

const Test = ({ ready }) => {
  return (
    <HiroApp ready={ready} theme="portal" themeVersion="1.0.17">
      <Container fluid>
        <TopBar
          title="Test Page"
          logo="https://hiro.arago.co/app/images/favicon/android-icon-192x192.png"
          options={[
            { key: "profile", title: "View Profile" },
            { key: "logout", title: "Logout" }
          ]}
          navigation={[
            { href: "/", contents: "Home" },
            { href: "/page1", contents: "Page 1" }
          ]}
          trigger={<Icon name="user" />}
        />
        <Container>Test</Container>
        <Route path="/" component={() => <h1>Hello world!</h1>} exact />
        <Route path="/page1" component={() => <h1>Hello page1!</h1>} exact />
      </Container>
    </HiroApp>
  );
};

// Render
const target = document.getElementById("app");

if (!target) {
  throw new Error("Failed to find #app");
}

render(<Test ready={console.log("ready!")} />, target);
