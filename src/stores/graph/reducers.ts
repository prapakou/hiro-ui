import { createReducer } from "typesafe-actions";
import { omit } from "lodash-es";

import { GraphStateType, GraphActionsType } from "./constants";

export const graphReducer = createReducer<GraphStateType, GraphActionsType>({})
  .handleAction("TOKEN_SET", (state, { payload }) => ({
    ...state,
    token: payload.token
  }))
  .handleAction("TOKEN_CLEAR", state => ({ ...omit(state, ["token"]) }));
