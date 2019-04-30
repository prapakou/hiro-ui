import React, { useCallback, useEffect, useState } from "react";
import { take, put } from "redux-saga/effects";

import { HiroApp, init, Loader } from "../src";

import { storiesOf } from "@storybook/react";
import { createAction, handleActions } from "redux-actions";
import { get } from "lodash-es";
import { useMappedState, useDispatch } from "redux-react-hook";

const sayHelloAction = createAction("SAY_HELLO", (message: string) => ({
  message
}));
const updateCountAction = createAction("UPDATE_COUNT", (count: number) => ({
  count
}));

const reducer = handleActions(
  {
    [sayHelloAction.toString()]: (store, { payload }) => {
      return {
        ...store,
        message: store["message"] + payload.message
      };
    },
    [updateCountAction.toString()]: (store, { payload }) => {
      return {
        ...store,
        count: store["count"] + payload.count
      };
    }
  },
  {
    message: "",
    count: 0
  }
);

function* handleHello() {
  while (true) {
    const { payload } = yield take(sayHelloAction);
    const { message } = payload;
    const words = message.split(" ").filter(Boolean);

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

storiesOf("Global store", module).add("Init", () => {
  const store = init();

  return <HiroApp store={store}>Hello world!</HiroApp>;
});

storiesOf("Global store", module).add("Init - Reducers", () => {
  const store = init({ testReducer: reducer });

  return (
    <HiroApp store={store}>
      <Test />
    </HiroApp>
  );
});

storiesOf("Global store", module).add("Init - Saga", () => {
  const store = init({ testReducer: reducer }, [handleHello]);

  return (
    <HiroApp store={store}>
      <Test />
      <Test2 />
    </HiroApp>
  );
});
