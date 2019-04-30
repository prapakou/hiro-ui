import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer
} from "redux";
import createSagaMiddleware, { Saga } from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { ERROR_NAMESPACE, errorReducer } from "./errors";
import { THEME_NAMESPACE, themeReducer, handleThemes } from "./themes";
import { HIRO_NAMESPACE } from "./constants";
import { AUTH_NAMESPACE } from "./auth/constants";
import { authReducer } from "./auth";

export * from "./errors";
export * from "./themes";

// Combine built-in sagas
function* mainSaga() {
  yield all([fork(handleThemes)]);
}

export function init(reducers?: { [index: string]: Reducer }, sagas?: Saga[]) {
  // Combine built-in reducers with exeternal ones
  const rootReducer = combineReducers({
    [HIRO_NAMESPACE]: combineReducers({
      [AUTH_NAMESPACE]: authReducer,
      [ERROR_NAMESPACE]: errorReducer,
      [THEME_NAMESPACE]: themeReducer
    }),
    ...reducers
  });

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();

  // Create store
  const store = createStore(
    rootReducer,
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
