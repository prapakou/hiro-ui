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
    .catch((err: Error) => {
      action("Failed to get profile")(err.message);
      setLoading(false);
    });

  return (
    <div>Hello {isLoading ? <Loader active inline size="tiny" /> : name}</div>
  );
};

const token =
  "mCcQQ4RSRKZxIHSP0N1FW6p7dsID7pFZ2wtsAwye3TyhMAkCAffQZGcgSE4YCnZSRP0UZCSQPpCNP0pWGHo8hJDP4E7LIqMS3VqILtO7qX1JsVrHYdkBRZq8khhjCwxl";

storiesOf("Auth", module).add("Orm", () => (
  <HiroApp
    auth={{
      endpoint: "https://eu-stagegraph.arago.co",
      token
    }}
  >
    <Hello />
  </HiroApp>
));
