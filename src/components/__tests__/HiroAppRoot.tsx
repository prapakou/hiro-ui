import React from "react";
import renderer from "react-test-renderer";

import { HiroAppRoot } from "../HiroAppRoot";
import { useErrorDispatch } from "../../stores";

test("Renders", () => {
  const component = renderer.create(<HiroAppRoot>Test</HiroAppRoot>);
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
    <HiroAppRoot>
      Test <Error />
    </HiroAppRoot>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
