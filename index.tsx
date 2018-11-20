import React, { useContext } from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";

import { Container, HiroApp, Icon, TopBar, HiroLoginContext } from "./src";
import { HiroAppStore } from "./src/stores";

const TestToken = () => {
  const token = HiroAppStore.get("token");

  return <h2>{token}</h2>;
};

const Test = ({ ready }) => {
  return (
    <HiroApp
      ready={ready}
      theme="portal"
      authConfig={{
        api: "https://stagegraph.arago.co",
        clientId: "cjn03dcm90ouch324bogp0jrx",
        url: "https://stagegraph.arago.co/api/6/auth/ui/"
      }}
      login
    >
      <Container fluid>
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
          trigger={<Icon name="user" />}
          search={[{ key: 1, value: 1, text: 1 }]}
          searchProps={{ onChange: console.log }}
        />
        <Container>
          Test <TestToken />
        </Container>
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
