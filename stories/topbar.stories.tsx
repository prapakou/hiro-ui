import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Route } from "react-router";

import {
  HiroApp,
  TopBar,
  Icon,
  TopBarDropdownProps,
  Container,
  TopBarSearchProps
} from "../src";

const dropdown: TopBarDropdownProps = {
  options: [
    {
      text: "Logout",
      key: "logout",
      onClick: action("Clicked Logout")
    }
  ],
  trigger: <Icon name="user" />,
  color: "blue" as const
};

const search: TopBarSearchProps = {
  options: ["a", "b", "c", "d", "e"].map(l => ({
    text: l.toUpperCase(),
    value: l,
    key: l
  })),
  onChange: action("Selected search item")
};

const nav = [
  { href: "/", contents: "Home" },
  { href: "/page1", contents: "Page 1" }
];

storiesOf("TopBar", module)
  .add("Default", () => (
    <HiroApp>
      <TopBar title="Test" />
      Hello world!
    </HiroApp>
  ))
  .add("Logo", () => (
    <HiroApp>
      <TopBar
        title="Test"
        logo="https://arago.co/wp-content/uploads/2017/09/about_arago_icon.png"
      />
      Hello world!
    </HiroApp>
  ))
  .add("Dropdown", () => (
    <HiroApp>
      <TopBar title="Test" dropdown={dropdown} />
      Hello world!
    </HiroApp>
  ))
  .add("Search", () => (
    <HiroApp>
      <TopBar title="Test" search={search} />
      Hello world!
    </HiroApp>
  ))
  .add("Nav", () => (
    <HiroApp>
      <TopBar title="Test" navigation={nav} />

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
  ))
  .add("All", () => (
    <HiroApp>
      <TopBar
        title="Test"
        navigation={nav}
        search={search}
        dropdown={dropdown}
        logo="https://arago.co/wp-content/uploads/2017/09/about_arago_icon.png"
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
  ));
