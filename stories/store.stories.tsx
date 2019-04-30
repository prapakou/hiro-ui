import React, { useCallback, useEffect, useState } from "react";
import { take, put } from "redux-saga/effects";

import { HiroApp, init, Loader } from "../src";

import { storiesOf } from "@storybook/react";
import { get } from "lodash-es";
import { useMappedState, useDispatch } from "redux-react-hook";
import {
  createStandardAction,
  ActionType,
  createReducer
} from "typesafe-actions";

const sayHelloAction = createStandardAction("SAY_HELLO")<string>();
const updateCountAction = createStandardAction("UPDATE_COUNT")<number>();

export interface IHelloState {
  message?: string;
  count?: number;
}
export type HelloActionsType = ActionType<
  typeof sayHelloAction | typeof updateCountAction
>;

const reducer = createReducer<IHelloState, HelloActionsType>(
  { message: "", count: 0 },
  {
    SAY_HELLO: (state, { payload }) => ({
      ...state,
      message: state.message + payload
    }),
    UPDATE_COUNT: (state, { payload }) => ({
      ...state,
      count: state.count + payload
    })
  }
);

function* handleHello() {
  while (true) {
    const { payload } = yield take(sayHelloAction);
    const words = payload.split(" ").filter(Boolean);

    yield put(updateCountAction(words.length));
  }
}

const Test = () => {
  const mapState = useCallback(
    state => get(state, ["testReducer", "message"]),
    []
  );
  const message = useMappedState(mapState);
  const dispatch = useDispatch();
  const sayHello = useCallback(
    (text: string) => dispatch(sayHelloAction(text)),
    []
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    sayHello("Hello ");
    setLoading(true);

    const cancel = setTimeout(() => {
      sayHello("world!");
      setLoading(false);
    }, 3000);

    return () => clearTimeout(cancel);
  }, []);

  return (
    <div>
      <span>{message}</span>
      {isLoading && <Loader active inline size="tiny" />}
    </div>
  );
};

const Test2 = () => {
  const mapState = useCallback(
    state => get(state, ["testReducer", "count"]),
    []
  );
  const count = useMappedState(mapState);

  return <p>Words: {count}</p>;
};

storiesOf("Global store", module)
  .add("Init", () => {
    const store = init();

    return <HiroApp store={store}>Hello world!</HiroApp>;
  })
  .add("Init - Reducers", () => {
    const store = init({ testReducer: reducer });

    return (
      <HiroApp store={store}>
        <Test />
      </HiroApp>
    );
  })
  .add("Init - Saga", () => {
    const store = init({ testReducer: reducer }, [handleHello]);

    return (
      <HiroApp store={store}>
        <Test />
        <Test2 />
      </HiroApp>
    );
  });
