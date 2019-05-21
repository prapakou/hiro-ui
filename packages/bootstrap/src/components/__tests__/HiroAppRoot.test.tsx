import React from "react";
import renderer from "react-test-renderer";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { HiroAppRoot } from "../HiroAppRoot";
import { useErrorDispatch } from "../../stores";

const mockStore = configureStore();
let store: MockStoreEnhanced;

beforeEach(() => {
  store = mockStore({});
});

test("Renders", () => {
  const component = renderer.create(
    <HiroAppRoot store={store}>Test</HiroAppRoot>
  );
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
    <HiroAppRoot store={store}>
      Test <Error />
    </HiroAppRoot>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
