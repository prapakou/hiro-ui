import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware, { Saga } from "redux-saga";
import { Reducer } from "typesafe-actions";

import { ERROR_NAMESPACE, errorReducer } from "./errors";
import { HIRO_NAMESPACE } from "./constants";

export * from "./errors";

// Combine built-in sagas
function* mainSaga() {
  // Add sagas
}

export function init(
  state?: any,
  reducers?: { [index: string]: Reducer<any, any> },
  sagas?: Saga[]
) {
  // Combine built-in reducers with exeternal ones
  const rootReducer = combineReducers({
    [HIRO_NAMESPACE]: combineReducers({
      [ERROR_NAMESPACE]: errorReducer
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
  sagaMiddleware.run(mainSaga);

  // Run external sagas
  if (sagas) {
    for (const saga of sagas) {
      sagaMiddleware.run(saga);
    }
  }

  return store;
}
