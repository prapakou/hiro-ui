import {
  AuthAccountVertex,
  AuthOrganizationVertex
} from "@hiro-graph/orm-mappings";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";

import {
  Container,
  Header,
  HiroApp,
  HiroStyle,
  Image,
  List,
  Segment,
  TopBar
} from "./src";
import { authStore, themeStore } from "./src/stores";

const TestText = ({ text }: { text: string }) => {
  const { token, orm } = authStore.getters.useAuth();
  const getColour = themeStore.getters.useColour();
  const [orgs, setOrgs] = useState<string[]>([]);

  const color = getColour("blue");

  console.log(color);

  orm
    .me<AuthAccountVertex>()
    .then(me => me.fetchVertices(["orgs"]))
    .then(me => me.getVertices<AuthOrganizationVertex>("orgs"))
    .then(myOrgs => myOrgs.map(o => o.get("name")))
    .then(setOrgs);

  return (
    <Segment>
      <Header content={text} />
      <Header content="Token" subheader={token} style={{ color }} />
      <List>
        <List.Header>Your Orgs</List.Header>
        {orgs.map(o => (
          <List.Item>{o}</List.Item>
        ))}
      </List>
    </Segment>
  );
};

const TestToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    authStore.getters.getToken().then(setToken);
  }, []);

  return (
    <p>
      <b>Get Token:</b> {token}
    </p>
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
      theme="saas"
      /*
      authConfig={{
        api: "https://ec2-34-254-95-19.eu-west-1.compute.amazonaws.com:8443",
        clientId: "cjpo3nyqg00l5hh62p39et2mi",
        url:
          "https://ec2-34-254-95-19.eu-west-1.compute.amazonaws.com:8443/api/6/auth/ui/"
      }}
      */
    >
      <HiroStyle />

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
              <TestToken />
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
