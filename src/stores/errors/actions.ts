import { createActions } from "redux-actions";
import { IErrorMessage } from "./constants";

export const { errorSet, errorClear } = createActions({
  ERROR_SET: ({ message, name = "Error" }: IErrorMessage) => ({
    message,
    name
  }),
  ERROR_CLEAR: () => null
});
