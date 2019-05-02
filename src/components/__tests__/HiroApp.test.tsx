import React from "react";
import renderer from "react-test-renderer";

import { HiroApp } from "../HiroApp";
import { useErrorDispatch } from "../../stores";

import { getTree } from "./helpers";

test("Renders", () => {
  const component = renderer.create(<HiroApp>Test</HiroApp>);
  const tree = getTree(component);

  expect(tree).toMatchSnapshot();
});

const Error = () => {
  const { setError } = useErrorDispatch();
  setError({ message: "Test error" });

  return <p>Oh no!!</p>;
};

test("Renders with Error", () => {
  const component = renderer.create(
    <HiroApp>
      Test <Error />
    </HiroApp>
  );
  const tree = getTree(component);

  expect(tree).toMatchSnapshot();
});
