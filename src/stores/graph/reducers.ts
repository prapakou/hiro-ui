import { createReducer } from "typesafe-actions";

import { GraphActionsType, GraphStateType } from "./constants";

export const graphReducer = createReducer<GraphStateType, GraphActionsType>({})
  .handleAction("GRAPH_QUERY_REQUEST", (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...payload,
      loading: true
    }
  }))
  .handleAction("GRAPH_QUERY_SUCCESS", (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      result: payload.result,
      loading: false
    }
  }))
  .handleAction("GRAPH_QUERY_FAILURE", (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      error: payload.error,
      loading: false
    }
  }))
  .handleAction("GRAPH_QUERY_CANCEL", (state, { payload }) => ({
    ...state,
    [payload.id]: {
      ...state[payload.id],
      loading: false
    }
  }));
