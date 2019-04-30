import React, { useContext, useState } from "react";

import { HiroApp, Loader } from "../src";

import { storiesOf } from "@storybook/react";
import { AuthContext } from "../src/contexts";
import { AuthAccountProfileVertex } from "@hiro-graph/orm-mappings";
import { action } from "@storybook/addon-actions";

const Hello = () => {
  const { orm } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(true);

  orm
    .getClient()
    .api.getMeProfile()
    .then(p => orm.insertRaw<AuthAccountProfileVertex>(p))
    .then(p => p.get("displayName") as string)
    .then(name => {
      setName(name);
      setLoading(false);
    })
    .catch(err => {
      action("Failed to get profile")(err);
      setLoading(false);
    });

  return (
    <div>Hello {isLoading ? <Loader active inline size="tiny" /> : name}</div>
  );
};

storiesOf("Auth", module).add("Orm", () => (
  <HiroApp
    auth={{
      endpoint: "https://eu-stagegraph.arago.co",
      token:
        "eljS6BcEwWLs0lR6VeLBagGw3jZd6E23am087HYLd52BxthStFXqhfJnHrDT4LNz8PL5PcabbYzbwFRs8Ni97fAB663Y8c1OLSb9URkERahFsjbswWAmmwbN3tzVFYny"
    }}
  >
    <Hello />
  </HiroApp>
));
