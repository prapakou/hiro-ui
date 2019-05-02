import { createStandardAction } from "typesafe-actions";

import { ErrorMessage } from "./constants";

export const errorSet = createStandardAction("ERROR_SET")<ErrorMessage>();
export const errorClear = createStandardAction("ERROR_CLEAR")();
