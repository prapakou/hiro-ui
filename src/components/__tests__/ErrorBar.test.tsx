import React from "react";
import renderer from "react-test-renderer";
import { StoreContext } from "redux-react-hook";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { ErrorBar } from "../ErrorBar";
import { ERROR_NAMESPACE } from "../../stores";
import { HIRO_NAMESPACE } from "../../stores/constants";

const mockStore = configureStore();
let store: MockStoreEnhanced;

beforeEach(() => {
  store = mockStore({});
});

test("No error", () => {
  const component = renderer.create(
    <StoreContext.Provider value={store}>
      <ErrorBar />
    </StoreContext.Provider>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("With error", () => {
  store = mockStore({
    [HIRO_NAMESPACE]: {
      [ERROR_NAMESPACE]: { message: "An error" }
    }
  });

  const component = renderer.create(
    <StoreContext.Provider value={store}>
      <ErrorBar />
    </StoreContext.Provider>
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
