import { handleActions, combineActions } from "redux-actions";
import { errorSet, errorClear } from "./actions";

export const errorReducer = handleActions(
  {
    [combineActions(errorSet, errorClear).toString()]: (_, { payload }) =>
      payload
  },
  null
);
