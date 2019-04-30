import React from "react";

import { HiroApp, useErrorDispatch, init } from "../src";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

storiesOf("HiroApp", module).add("Default", () => (
  <HiroApp>Hello world!</HiroApp>
));

storiesOf("HiroApp", module).add("Theme", () => (
  <HiroApp theme="saas" ready={action("Theme loaded!")}>
    Hello world!
  </HiroApp>
));

const Test = () => {
  const { setError } = useErrorDispatch();
  setError({ message: "Test error" });

  return <p>Oh no!!</p>;
};

storiesOf("HiroApp", module).add("Error", () => (
  <HiroApp>
    Hello world!
    <Test />
  </HiroApp>
));
