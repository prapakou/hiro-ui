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
  EntityTable,
  Table,
  Orm,
  useGraph,
  Icon
} from "../src";

const HiroGraphMappings = getMappings();

const token =
  "WlOM7V2VN6VZZ68Cptcb5xr6svZ4reLp9Rf0k0LIydsIguICh6B2pBALWrDfxklnknLPIaSeNMmHGaScozPnMylJa86hg7jnYCyl9VIqHL3govOzGSuvniZfETN9NXsq";

const globalOrm = new HiroGraphOrm(
  {
    endpoint: "https://ec2-34-252-56-37.eu-west-1.compute.amazonaws.com:8443",
    token
  },
  HiroGraphMappings
) as Orm;

const store = init({ orm: globalOrm });

const Row: React.FC<{
  data: AutomationKnowledgeItemVertex;
  availablePools: AutomationKnowledgePoolVertex[];
}> = props => {
  const { data: value, availablePools } = props;
  const [pools, setPools] = useState([]);

  useEffect(() => {
    value.fetchVertices(["usedByKnowledgePool"]).then(res => {
      setPools(res._ids.usedByKnowledgePool);
    });
  }, []);

  return (
    <Table.Row>
      <Table.Cell width="14">{value.get("name")}</Table.Cell>

      <Table.Cell textAlign="center">
        {availablePools.map(p => (
          <Icon
            key={p._id}
            name="circle"
            size="large"
            color={pools.includes(p._id) ? "green" : "grey"}
          />
        ))}
      </Table.Cell>
    </Table.Row>
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
    <EntityTable
      entity="AutomationKnowledgeItem"
      limit={10}
      headerRow={[
        "Test",
        { content: "Status", textAlign: "center", key: "status" }
      ]}
      renderBodyRow={(data: AutomationKnowledgeItemVertex) => (
        <Row key={data._id} data={data} availablePools={availablePools} />
      )}
    />
  );
};

storiesOf("EntityTable", module).add("Default", () => (
  <HiroAppRoot store={store} orm={globalOrm}>
    <HiroTheme.Default />
    <Test />
  </HiroAppRoot>
));
