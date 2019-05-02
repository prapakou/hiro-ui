import { createStandardAction } from "typesafe-actions";

import { TokenSet } from "./constants";

export const tokenSet = createStandardAction("TOKEN_SET")<TokenSet>();
export const tokenClear = createStandardAction("TOKEN_CLEAR")();
