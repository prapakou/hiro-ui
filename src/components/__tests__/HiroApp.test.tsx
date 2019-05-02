import React from "react";
import renderer from "react-test-renderer";

import { HiroApp } from "../HiroApp";
import { useErrorDispatch } from "../../stores";

test("Renders", () => {
  const component = renderer.create(<HiroApp>Test</HiroApp>);
  const tree = component.toJSON();

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
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
