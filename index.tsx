import React from "react";
import { render } from "react-dom";
import {
  Container,
  HiroApp,
  HiroLogin,
  HiroLoginConsumer,
  Icon,
  TopBar
} from "./src";

const Test = ({ ready }) => {
  return (
    <HiroApp ready={ready}>
      <HiroLogin
        config={{
          api: "https://stagegraph.arago.co",
          clientId: "cjn03dcm90ouch324bogp0jrx",
          url: "https://stagegraph.arago.co/api/6/auth/ui/"
        }}
      >
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
          <HiroLoginConsumer>
            {context => <h1>Hello world!</h1>}
          </HiroLoginConsumer>
        </Container>
      </HiroLogin>
    </HiroApp>
  );
};

// Render
const target = document.getElementById("app");

if (!target) {
  throw new Error("Failed to find #app");
}

render(<Test ready={console.log("ready!")} />, target);
