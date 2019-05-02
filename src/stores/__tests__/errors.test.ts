import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { errorSet, errorClear, errorReducer } from "../errors";

const mockStore = configureStore();
let store: MockStoreEnhanced;

beforeEach(() => {
  store = mockStore({});
});

test("Error state", () => {
  let action: any = store.dispatch(errorSet({ message: "An error" }));
  expect(store.getActions()).toMatchSnapshot("Add");
  expect(errorReducer(undefined, action)).toMatchSnapshot("Add - Reducer");

  action = store.dispatch(errorClear());
  expect(store.getActions()).toMatchSnapshot("Clear");
  expect(errorReducer(undefined, action)).toMatchSnapshot("Clear - Reducer");
});
