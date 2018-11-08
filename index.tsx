import React from "react";
import { render } from "react-dom";
import { Container, HiroApp, HiroLoginContext, Icon, TopBar } from "./src";

const Test = ({ ready }) => {
  return (
    <HiroApp ready={ready}>
      <Container fluid>
        <TopBar
          title="Test Page"
          logo="https://hiro.arago.co/app/images/favicon/android-icon-192x192.png"
          options={[
            { key: "profile", title: "View Profile" },
            { key: "logout", title: "Logout" }
          ]}
          items={[{ key: "licenses", contents: "Licenses" }]}
          trigger={<Icon name="user" />}
        />
        <Container>Test</Container>
        <HiroLoginContext.Consumer>
          {context => <h1>Hello world!</h1>}
        </HiroLoginContext.Consumer>
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
