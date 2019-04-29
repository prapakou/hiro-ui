import { handleActions, combineActions } from "redux-actions";
import { themeRequest, themeSuccess, themeError } from "./actions";

export const themeReducer = handleActions(
  {
    [themeRequest.toString()]: (_, { payload }) => ({
      ...payload
    }),
    [combineActions(themeSuccess, themeError).toString()]: (
      state,
      { payload }
    ) => ({ ...state, ...payload })
  },
  {}
);
