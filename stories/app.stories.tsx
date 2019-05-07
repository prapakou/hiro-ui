import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import {
  HiroAppRoot,
  TopBar,
  TopBarDropdownProps,
  Container,
  HiroTheme,
  Icon,
  init,
  useGraph
} from "../src";

const dropdown: TopBarDropdownProps = {
  options: [
    {
      icon: "user",
      text: "Do something",
      key: "something",
      onClick: action("Clicked Do Something")
    },
    {
      icon: <Icon name="log out" color="red" />,
      text: "Logout",
      key: "logout",
      onClick: action("Clicked Logout")
    }
  ]
};

const token = "";
const store = init();

const Hello = () => {
  const { me } = useGraph();

  if (!me) {
    return null;
  }

  return <p>Hello {me.profile.get("displayName")}!</p>;
};

const auth = {
  endpoint: "https://eu-stagegraph.arago.co",
  token
};

storiesOf("App", module).add("Demo", () => (
  <HiroAppRoot store={store} auth={auth}>
    <HiroTheme.Default />
    <TopBar
      title="Test"
      dropdown={dropdown}
      logo="https://arago.co/wp-content/uploads/2017/09/about_arago_icon.png"
    />

    <Container>
      <Hello />
    </Container>
  </HiroAppRoot>
));
