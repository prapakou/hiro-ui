import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware, { Saga } from "redux-saga";
import { fork } from "redux-saga/effects";
import { Reducer } from "typesafe-actions";

import { Orm } from "../contexts";

import { ERROR_NAMESPACE, errorReducer } from "./errors";
import { HIRO_NAMESPACE } from "./constants";
import { GRAPH_NAMESPACE, handleGraphRequests, graphReducer } from "./graph";

export * from "./errors";
export * from "./graph";

// Combine built-in sagas
function* mainSaga(orm?: Orm) {
  yield fork(handleGraphRequests, orm);
}

export interface StoreInit {
  state?: any;
  reducers?: { [index: string]: Reducer<any, any> };
  sagas?: Saga[];
  orm?: Orm;
}

export function init({ state, reducers, sagas, orm }: StoreInit = {}) {
  // Combine built-in reducers with exeternal ones
  const rootReducer = combineReducers({
    [HIRO_NAMESPACE]: combineReducers({
      [ERROR_NAMESPACE]: errorReducer,
      [GRAPH_NAMESPACE]: graphReducer
    }),
    ...reducers
  });

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  // Create store
  const store = createStore(
    rootReducer,
    state,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  // Run built-in saga
  sagaMiddleware.run(mainSaga, orm);

  // Run external sagas
  if (sagas) {
    for (const saga of sagas) {
      sagaMiddleware.run(saga);
    }
  }

  return store;
}

export type GlobalStore = ReturnType<typeof init>;
