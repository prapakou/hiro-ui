import { createReducer } from "typesafe-actions";

import { ThemeStateType, ThemeActionsType } from "./constants";

export const themeReducer = createReducer<ThemeStateType, ThemeActionsType>({})
  .handleAction(
    "THEME_REQUEST",
    (_, { payload: { theme = "default" as const } }) => ({
      theme
    })
  )
  .handleAction("THEME_SUCCESS", (state, { payload }) => ({
    ...state,
    ...payload
  }))
  .handleAction("THEME_ERROR", (state, { payload }) => ({
    ...state,
    ...payload
  }));
