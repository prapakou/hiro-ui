import React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";

import { Container, Header, HiroApp, Image, Segment, TopBar } from "./src";
import { authStore, themeStore } from "./src/stores";

const TestText = ({ text }) => {
  const { me, token } = authStore.getters.useAuth();
  const theme = themeStore.getters.useTheme();

  const color = themeStore.helpers.getColours(theme, "blue");

  console.log(color);

  // @ts-ignore
  const sub = me && me.get ? me.get("email") : "";

  return (
    <Segment>
      <Header content={text} subheader={"Welcome " + sub} />
      <Header content="Token" subheader={token} style={{ color }} />
    </Segment>
  );
};

const Avatar = () => {
  const { me } = authStore.getters.useAuth();
  const src = me ? `https://stagegraph.arago.co/${me.get("_id")}/picture` : "";
  return <Image avatar circular src={src} bordered />;
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
          trigger={<Avatar />}
          search={[{ key: 1, value: 1, text: 1 }]}
          searchProps={{ onChange: () => console.log("onChange") }}
          color="orange"
        />

        <Route
          path="/"
          component={() => (
            <Container>
              <TestText text="Hello world!" />
            </Container>
          )}
          exact
        />
        <Route
          path="/page1"
          component={() => (
            <Container>
              <TestText text="Hello world again!" />
            </Container>
          )}
          exact
        />
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
