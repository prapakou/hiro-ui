import { createReducer } from "typesafe-actions";

import { ErrorActionsType, ErrorStateType } from "./constants";

export const errorReducer = createReducer<ErrorStateType, ErrorActionsType>(
  null
)
  .handleAction("ERROR_SET", (_, { payload: { name = "Error", message } }) => ({
    name,
    message
  }))
  .handleAction("ERROR_CLEAR", () => null);
