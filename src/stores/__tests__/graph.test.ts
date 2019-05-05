import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { tokenSet, tokenClear, graphReducer } from "../graph";

const mockStore = configureStore();
let store: MockStoreEnhanced;

beforeEach(() => {
  store = mockStore({});
});

test("Auth state", () => {
  let action: any = store.dispatch(tokenSet({ token: "My token" }));
  expect(store.getActions()).toMatchSnapshot("Set");
  expect(graphReducer(undefined, action)).toMatchSnapshot("Add - Reducer");

  action = store.dispatch(tokenClear());
  expect(store.getActions()).toMatchSnapshot("Clear");
  expect(graphReducer(undefined, action)).toMatchSnapshot("Clear - Reducer");
});
