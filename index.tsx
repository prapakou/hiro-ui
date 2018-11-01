import React from "react";
import { render } from "react-dom";
import { Container, Icon, TopBar } from "./src";

const dropdownOptions = [
  { key: "profile", text: "View Profile" },
  { key: "logout", text: "Logout" }
];

const Test = () => {
  return (
    <Container fluid>
      <TopBar
        title="Test Page"
        logo="https://hiro.arago.co/app/images/favicon/android-icon-192x192.png"
        options={[
          { key: "profile", text: "View Profile" },
          { key: "logout", text: "Logout" }
        ]}
        trigger={<Icon name="user" />}
      />
      <Container>Test</Container>
    </Container>
  );
};

// Render

const target = document.getElementById("app");

if (!target) {
  throw new Error("Failed to find #app");
}

render(<Test />, target);
