import React from "react";
import { storiesOf } from "@storybook/react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings, {
  AuthDataScopeVertex
} from "@hiro-graph/orm-mappings";

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

const ListItem: React.FC<{ "data-value": AuthDataScopeVertex }> = props => {
  const { "data-value": value } = props;

  return (
    <List.Item>
      <List.Icon name="database" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{value.get("name")}</List.Header>
        <List.Description>{value.get("description")}</List.Description>
      </List.Content>
    </List.Item>
  );
};

const Test = () => {
  const { orm } = useGraph();

  if (!orm) {
    return null;
  }

  return <LazyList entity="AuthDataScope" item={ListItem} limit={10} />;
};

storiesOf("LazyList", module).add("Default", () => (
  <HiroAppRoot store={store} orm={globalOrm}>
    <HiroTheme.Default />
    <Test />
  </HiroAppRoot>
));
