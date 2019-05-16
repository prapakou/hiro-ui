import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";
import HiroGraphOrm from "@hiro-graph/orm";
import {
  AutomationKnowledgeItemVertex,
  AutomationKnowledgePoolVertex
} from "@hiro-graph/orm-mappings";

import {
  getMappings,
  HiroAppRoot,
  HiroTheme,
  init,
  LazyList,
  List,
  Orm,
  useGraph
} from "../src";

const HiroGraphMappings = getMappings();

const token = "";

const globalOrm = new HiroGraphOrm(
  {
    endpoint: "https://eu-stagegraph.arago.co",
    token
  },
  HiroGraphMappings
) as Orm;

const store = init({ orm: globalOrm });

const ListItem: React.FC<{
  "data-value": AutomationKnowledgeItemVertex;
  availablePools: AutomationKnowledgePoolVertex[];
}> = props => {
  const { "data-value": value, availablePools } = props;
  const [pools, setPools] = useState([]);

  useEffect(() => {
    value.fetchVertices(["usedByKnowledgePool"]).then(res => {
      setPools(res._ids.usedByKnowledgePool);
    });
  }, []);

  return (
    <List.Item>
      <List.Content floated="right">
        {availablePools.map(p => (
          <List.Icon
            name="circle"
            size="large"
            verticalAlign="middle"
            color={pools.includes(p._id) ? "green" : "grey"}
          />
        ))}
      </List.Content>

      <List.Content>
        <List.Header>{value.get("name")}</List.Header>
      </List.Content>
    </List.Item>
  );
};

const Test = () => {
  const { orm } = useGraph();
  const [availablePools, setSvailablePools] = useState<
    AutomationKnowledgePoolVertex[]
  >([]);

  useEffect(() => {
    if (orm) {
      orm.AutomationKnowledgePool.find({}).then(setSvailablePools);
    }
  }, [orm]);

  return (
    <LazyList entity="AutomationKnowledgeItem" limit={10}>
      {props => <ListItem {...props} availablePools={availablePools} />}
    </LazyList>
  );
};

storiesOf("LazyList", module).add("Default", () => (
  <HiroAppRoot store={store} orm={globalOrm}>
    <HiroTheme.Default />
    <Test />
  </HiroAppRoot>
));
