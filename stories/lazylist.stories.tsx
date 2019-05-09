import React from "react";
import { storiesOf } from "@storybook/react";
import HiroGraphOrm from "@hiro-graph/orm";
import HiroGraphMappings, {
  AutomationAutomationIssueVertex
} from "@hiro-graph/orm-mappings";

import {
  HiroAppRoot,
  LazyList,
  HiroTheme,
  init,
  List,
  Orm,
  SemanticICONS,
  SemanticCOLORS
} from "../src";

const safeMappings = HiroGraphMappings.filter(
  m => m.name !== "AutomationVariable"
);

const token = "";

const globalOrm = new HiroGraphOrm(
  {
    endpoint: "https://ec2-34-252-56-37.eu-west-1.compute.amazonaws.com:8443",
    token
  },
  safeMappings
) as Orm;

const store = init({ orm: globalOrm });

const ListItem: React.FC<{
  "data-value": AutomationAutomationIssueVertex;
}> = props => {
  const { "data-value": value } = props;

  let statusIcon: SemanticICONS;
  let statusColor: SemanticCOLORS;
  let isLoading = false;

  switch (value.get("status")) {
    case "RESOLVED":
      statusIcon = "check circle";
      statusColor = "green";
      break;
    case "RESOLVED_EXTERNAL":
      statusIcon = "check circle";
      statusColor = "blue";
      break;
    case "PROCESSING":
      statusIcon = "spinner";
      statusColor = "grey";
      isLoading = true;
      break;
    default:
      statusIcon = "circle outline";
      statusColor = "black";
      break;
  }

  return (
    <List.Item>
      <List.Content floated="right">
        <List.Description>{value.get("status")}</List.Description>
      </List.Content>
      <List.Icon
        name={statusIcon}
        size="large"
        verticalAlign="middle"
        color={statusColor}
        loading={isLoading}
      />
      <List.Content>
        <List.Header>{value.get("subject")}</List.Header>
        <List.Description>{value.get("deployStatus")}</List.Description>
      </List.Content>
    </List.Item>
  );
};

const Test = () => (
  <LazyList entity="AutomationAutomationIssue" item={ListItem} limit={10} />
);

storiesOf("LazyList", module).add("Default", () => (
  <HiroAppRoot store={store} orm={globalOrm}>
    <HiroTheme.Default />
    <Test />
  </HiroAppRoot>
));
