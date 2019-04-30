import { createReducer } from "typesafe-actions";
import { omit } from "lodash-es";
import { AuthStateType, AuthActionsType } from "./constants";

export const authReducer = createReducer<AuthStateType, AuthActionsType>({})
  .handleAction("TOKEN_SET", (state, { payload }) => ({
    ...state,
    token: payload.token
  }))
  .handleAction("TOKEN_CLEAR", (state, _) => ({ ...omit(state, ["token"]) }));
