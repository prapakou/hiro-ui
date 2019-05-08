import React from "react";
import { storiesOf } from "@storybook/react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings from "@hiro-graph/orm-mappings";

import {
  HiroAppRoot,
  LazyList,
  HiroTheme,
  init,
  useGraph,
  List,
  Orm
} from "../src";

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

const token = "";

const globalOrm = new HiroGraphOrm(
  {
    endpoint: "https://eu-stagegraph.arago.co",
    token
  },
  safeMappings
) as Orm;

const store = init({ orm: globalOrm });

const ListItem: React.FC = props => {
  console.log("props", props);
  return (
    <List.Item>
      <List.Icon name="github" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
        <List.Description as="a">Updated 10 mins ago</List.Description>
      </List.Content>
    </List.Item>
  );
};

const Test = () => {
  const { orm } = useGraph();

  if (!orm) {
    return null;
  }

  return <LazyList entity="Event" item={ListItem} />;
};

storiesOf("LazyList", module).add("Default", () => (
  <HiroAppRoot store={store} orm={globalOrm}>
    <HiroTheme.Default />
    <Test />
  </HiroAppRoot>
));
