import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";
import UNSTATED from "unstated-debug";

UNSTATED.logStateChanges = true;

import {
  AuthStore,
  Container,
  Header,
  HiroApp,
  Image,
  Label,
  Segment,
  subscribe,
  TopBar
} from "./src";

const TestText = subscribe({ store: AuthStore })(
  ({ text, store }: { text: string; store: AuthStore }) => {
    const [me, setMe] = useState({});
    const token = store.getToken();

    useEffect(() => {
      console.debug("Test: mount");
      store.state.orm.person().then(setMe);

      const i = setInterval(() => {
        console.debug("Test: orm");
        store.state.orm.person().then(setMe);
      }, 3000);

      return () => clearInterval(i);
    }, []);

    // @ts-ignore
    const sub = me && me.get ? me.get("email") : "";

    return (
      <Segment>
        <Header content={text} subheader={"Welcome " + sub} />
        <Label content="Token" detail={token.substr(0, 50) + "..."} />
      </Segment>
    );
  }
);

const Avatar = subscribe({ store: AuthStore })(
  ({ store }: { store: AuthStore }) => {
    const src = store.state.me
      ? `https://stagegraph.arago.co/${store.state.me.get("_id")}/picture`
      : "";
    return <Image avatar circular src={src} bordered />;
  }
);

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
