import { createStandardAction } from "typesafe-actions";
import { IErrorMessage } from "./constants";

export const errorSet = createStandardAction("ERROR_SET")<IErrorMessage>();
export const errorClear = createStandardAction("ERROR_CLEAR")();
